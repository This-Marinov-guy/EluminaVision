import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { writeToGoogleSheet } from "@/server/google/spreadsheet-service";
import { ORDER_EMAIL_TEMPLATE_ID, ORDERS_GOOGLE_SHEET_ID } from "@/utils/defines";
import mailTrap from "@/server/mails/mail-trap";
import { extractIdFromRequest, getShippingCostDetails, updateFirstNRows } from "@/utils/helpers";
import { QR_CODES_VARIANTS } from "@/utils/products";

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

      const orderNumber = uuidv4();
      const customerDetails = session.customer_details;
      const shippingDetails = session.shipping_details;
      const shippingCost = session.shipping_cost;
      const shippingCostDetails = getShippingCostDetails(shippingCost.shipping_rate ?? "");
      const metadata = session.metadata || {};
      const userId = session.metadata.userId;
      let orderedQrCodesQuantity = 0;

      const email = customerDetails?.email;
      const name = customerDetails?.name;
      const phone = customerDetails?.phone;
      const shippingAddress = shippingDetails?.address;

      // Convert metadata into an array of objects
      const items = Object.keys(metadata.items)
        .map((key) => {
          try {
            return JSON.parse(metadata["items"][key]); // Attempt to parse the metadata
          } catch (err) {
            console.error(`Failed to parse metadata key: ${key}`, err);
            return null;
          }
        })
        .filter((item) => item !== null); // Filter out any null results if parsing fails

      const formattedItems = items.map((item) => {
        if (QR_CODES_VARIANTS.map((card) => card.title).includes(item.title)) {
          orderedQrCodesQuantity += item.quantity;
        }

        return `${item.quantity} x ${item.title} (${item.variant}) - ${item.currency}${item.price}`;
      });

      const data = [
        orderNumber,
        name || "",
        email || "",
        phone || "",
        shippingAddress ? JSON.stringify(shippingAddress) : "",
        formattedItems.join(", "),
        shippingCostDetails,
      ];

      let qrCodes = [];

      try {
        if (orderedQrCodesQuantity) {
          qrCodes = await updateFirstNRows(orderedQrCodesQuantity, userId);
          data["qrCodes"] = qrCodes.join(", ");
        }
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

      break;

    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
