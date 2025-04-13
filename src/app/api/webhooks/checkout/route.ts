import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { writeToGoogleSheet } from "@/server/google/spreadsheet-service";
import { ORDER_EMAIL_TEMPLATE_ID, ORDERS_GOOGLE_SHEET_ID } from "@/utils/defines";
import mailTrap from "@/server/mails/mail-trap";
import { extractIdFromRequest, getShippingCostDetails, updateFirstNRows } from "@/utils/helpers";
import { QR_CODES_VARIANTS } from "@/utils/products";
import { supabase } from "@/utils/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_CHECKOUT_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook Error:", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      const session = event.data.object as Stripe.Checkout.Session;

      const customerDetails = session.customer_details;
      const shippingDetails = session.shipping_details;
      const shippingCost = session.shipping_cost;
      const shippingCostDetails = getShippingCostDetails(shippingCost?.shipping_rate ?? "");

      const email = customerDetails?.email;
      const name = customerDetails?.name;
      const phone = customerDetails?.phone;
      const shippingAddress = shippingDetails?.address;

      const orderNumber = session.metadata?.orderNumber ?? "";
      let unfinishedOrder = null;

      try {
        const { data, error } = await supabase
          .from("unfinished_orders")
          .select("items")
          .eq("id", session.metadata?.orderNumber)
          .single();

        if (error) throw error;

        unfinishedOrder = data?.items ? JSON.parse(data.items) : null;
      } catch (err) {
        console.error("Error fetching order:", err);
        return NextResponse.json(
          {
            received: true,
            warning: "Order received but failed fetch it",
            log: err.message,
          },
          { status: 200 },
        );
      }

      if (!unfinishedOrder) {
        return NextResponse.json(
          {
            received: true,
            warning: "Order received but failed to find it",
          },
          { status: 200 },
        );
      }

      const userId = unfinishedOrder.userId;
      let items = unfinishedOrder.items;
      let orderedQrCodesQuantity = 0;
      let orderedBusinessCardsQuantity = 0;

      // convert items to array without null values
      items = Object.values(items).filter(Boolean);

      const formattedItems = items.map((item) => {
        if (QR_CODES_VARIANTS.map((card) => card.id).includes(item.id)) {
          if (item.id == 3) {
            orderedQrCodesQuantity += item.quantity;
          } else if (item.id == 4) {
            orderedBusinessCardsQuantity += item.quantity;
          }
        }

        return `${item.quantity} x ${item.title} (${item.variant}) - ${item.currency}${item.price}`;
      });

      const data = [
        new Date().toISOString(),
        orderNumber,
        name || "",
        email || "",
        phone || "",
        shippingAddress ? JSON.stringify(shippingAddress) : "",
        formattedItems.join(", "),
        shippingCostDetails,
      ];

      let qrCodes = [];
      let businessCards = [];

      if (orderedQrCodesQuantity) {
        try {
          qrCodes = await updateFirstNRows(orderedQrCodesQuantity, 'qr_codes', userId);
          data["qrCodes"] = qrCodes.join(", ");
        } catch (err) {
          console.error("Error updating qr codes:", err);
          return NextResponse.json(
            {
              received: true,
              warning: "Order received but failed to update qr codes",
              log: err.message,
            },
            { status: 200 },
          );
        }
      }

      if (orderedBusinessCardsQuantity) {
        try {
          businessCards = await updateFirstNRows(orderedBusinessCardsQuantity, "business_cards", userId);
          data["businessCards"] = businessCards.join(", ");
        } catch (err) {
          console.error("Error updating qr codes:", err);
          return NextResponse.json(
            {
              received: true,
              warning: "Order received but failed to update business cards",
              log: err.message,
            },
            { status: 200 },
          );
        }
      }

      try {
        await writeToGoogleSheet(data, ORDERS_GOOGLE_SHEET_ID);
      } catch (err) {
        console.error("Error writing to Google Sheet:", err);
        return NextResponse.json(
          {
            received: true,
            warning: "Order received but failed to write to spreadsheet",
            log: err.message,
          },
          { status: 200 },
        );
      }

      try {
        await mailTrap({
          receiver: email,
          template_uuid: ORDER_EMAIL_TEMPLATE_ID,
          data: {
            orderNumber,
            name,
            email,
            phone,
            shippingAddress,
            items: formattedItems,
            shippingCostDetails,
            qrCodes,
            businessCards,
          },
        });
      } catch (err) {
        console.error("Error sending mail:", err);
        return NextResponse.json(
          {
            received: true,
            warning: "Order received but failed to send confirmation mail",
            log: err.message,
          },
          { status: 200 },
        );
      }

      try {
        // await supabase.from("unfinished_orders").delete().eq("id", orderNumber);
      } catch (err) {
        console.error("Error deleting finished order:", err);
        return NextResponse.json(
          {
            received: true,
            warning: "Order received but failed to delete unfinished order",
            log: err.message,
          },
          { status: 200 },
        );
      }

      break;

    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
