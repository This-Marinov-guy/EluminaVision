import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { writeToGoogleSheet } from "@/server/google/spreadsheet-service";
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
      const metadata = session.metadata || {};

      const email = customerDetails?.email;
      const name = customerDetails?.name;
      const phone = customerDetails?.phone;
      const shippingAddress = shippingDetails?.address;

      // Safely parse metadata and handle potential format issues
      const items = Object.entries(metadata)
        .map(([key, value]) => {
          if (!value) return null;

          try {
            // Check if the value is already an object
            if (typeof value === "object") {
              return value;
            }

            // Handle potential single quotes
            const sanitizedValue = value.replace(/'/g, '"');
            return JSON.parse(sanitizedValue);
          } catch (err) {
            console.error(`Failed to parse metadata for key ${key}:`, err);
            return null;
          }
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

      const formattedItems = items.map((item) => {
        return `${item.quantity} x ${item.title} (${item.variant}) - ${item.currency}${item.price}`;
      });

      const data = [
        orderNumber,
        name || "",
        email || "",
        phone || "",
        shippingAddress ? JSON.stringify(shippingAddress) : "",
        formattedItems.join(", "),
      ];

      try {
        await writeToGoogleSheet(data, ORDERS_GOOGLE_SHEET_ID);
      } catch (err) {
        console.error("Error writing to Google Sheet:", err);
        return NextResponse.json(
          {
            received: true,
            warning: "Order received but failed to write to spreadsheet",
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
