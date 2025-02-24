import Stripe from "stripe";

export const EMAIL = "Eluminavision@gmail.com";
export const FACEBOOK = "https://www.facebook.com/profile.php?id=61557462632493";
export const INSTAGRAM = "https://www.instagram.com/eluminavision";
export const PHONE = "+44 7572 798567";

export const ALLOWED_CHECKOUT_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] =
  [
    "AD",
    "AL",
    "AT",
    "BE",
    "BG",
    "CH",
    "CY",
    "CZ",
    "DE",
    "DK",
    "EE",
    "ES",
    "FI",
    "FO",
    "FR",
    "GB",
    "GG",
    "GI",
    "GR",
    "HR",
    "HU",
    "IE",
    "IM",
    "IS",
    "IT",
    "JE",
    "LI",
    "LT",
    "LU",
    "LV",
    "MC",
    "MD",
    "ME",
    "MK",
    "MT",
    "NL",
    "NO",
    "PL",
    "PT",
    "RO",
    "RS",
    "SE",
    "SI",
    "SK",
    "SM",
    "UA",
    "VA",
  ];

  export const ORDERS_GOOGLE_SHEET_ID = "1heilbVL1Vq09nW94QTm1gS1sPo9luxCyZCCUKcEkkEE";

  export const ORDER_EMAIL_TEMPLATE_ID = "6f632cbe-a7eb-4018-a7f1-30c333e00fad";