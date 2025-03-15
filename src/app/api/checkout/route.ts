import { ALLOWED_CHECKOUT_COUNTRIES } from "@/utils/defines";
import { extractIdFromRequest } from "@/utils/helpers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { items } = await request.json();

    const lineItems = items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    const metadata = {};

    metadata["items"] = JSON.stringify(items.reduce((acc, item, index) => {
      acc[`item_${index}`] = item; // Creates a unique key for each item
      return acc;
    }, {}));

    if (!metadata["items"]) {
      metadata["items"] = '{}'; 
    }

    metadata["userId"] = request.headers.get("authorization")
      ? extractIdFromRequest(request.headers.get("authorization"))
      : null;

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      metadata,
      phone_number_collection: {
        enabled: true,
      },
      shipping_options: [
        {
          shipping_rate: "shr_1Qvm1iLUXmDaRfFYelNucXsc",
        },
        {
          shipping_rate: "shr_1Qvm2JLUXmDaRfFYkVMN5yOr",
        },
      ],
      shipping_address_collection: {
        allowed_countries: ALLOWED_CHECKOUT_COUNTRIES,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/failed`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
