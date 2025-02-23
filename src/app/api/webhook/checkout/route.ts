import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { writeToGoogleSheet } from "@/server/google/spreadsheet-service";
import mailTrap from "@/server/mails/mail-trap";
import { ORDERS_GOOGLE_SHEET_ID } from "@/utils/defines";

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
      const metadata = session.metadata;

      const email = customerDetails?.email;
      const name = customerDetails?.name;
      const phone = customerDetails?.phone;
      const shippingAddress = shippingDetails?.address;

      // Convert metadata into an array of objects
      let items = Object.keys(metadata).map((key) => {
        return JSON.parse(metadata[key]);
      });

      items = items.map((item) => {
        return `${item.quantity} x ${item.title} (${item.variant}) - ${item.currency}${item.price}`;
      });

      const data = [orderNumber, name, email, phone, shippingAddress, items.join(", ")];

      try {
          await writeToGoogleSheet(data, ORDERS_GOOGLE_SHEET_ID);
        //   await mailTrap({
        //     receiver: email,
        //     template_uuid: "",
        //     subject: "Order Confirmation",
        //     data: {
        //         orderNumber,
        //         name,
        //         phone,
        //         shippingAddress,
        //         items,
        //     },
        //   });
      } catch (err) {
        console.error("Error in webhook:", err);
        throw new Error("Error in webhook: " + err);
      }

      break;

    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
