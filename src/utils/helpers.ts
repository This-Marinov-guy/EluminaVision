import { supabase } from "./config";

export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return currency;
  }
};

export const getShippingCostDetails = (id) => {
  switch (id) {
    case "shr_1Qvm1iLUXmDaRfFYelNucXsc":
      return "UK delivery (Royal Mail) | 1 - 2 business days | £3.25";
    case "shr_1Qvm2JLUXmDaRfFYkVMN5yOr":
      return "Europe delivery (Royal Mail) | 2 - 4 business days | £5.00";
    default:
      return "TBD";
  }
};

export const extractIdFromRequest = (authHeader: string) => {
  if (!authHeader) return null;

  try {
    const token = authHeader.split(" ")[1];
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Session expired");
    }

    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

    return payload["sub"];
  } catch (error) {
    return null;
  }
};

export async function updateFirstNRows(n: number, userId = null): Promise<number[] | null> {
  // 1️⃣ Fetch first N rows with status = 1
  const { data: rows, error: fetchError } = await supabase
    .from("qr_codes")
    .select("id")
    .eq("status", 1)
    .order("id", { ascending: true }) // Fetch oldest rows first
    .limit(n);

  if (fetchError || !rows?.length) {
    console.error("Error fetching rows or no rows found:", fetchError);
    return null;
  }

  const qrCodeIds = rows.map((row) => row.id);

  // 2️⃣ Update the fetched rows
  const updatePayload = { status: 2 };
  if (userId) updatePayload["user_id"] = userId;

  const { error: updateError } = await supabase.from("qr_codes").update(updatePayload).in("id", qrCodeIds);

  if (updateError) {
    console.error("Error updating QR codes:", updateError);
    return null;
  }

  console.log(`Successfully updated ${qrCodeIds.length} QR codes!`);

  return qrCodeIds;
}

export const getLinkIcon = (url: string, label: string = "") => {
  const lowerLabel = label.toLowerCase();

  if (url.includes("facebook") || lowerLabel.includes("facebook")) {
    return "fa-brands fa-facebook";
  } else if (url.includes("instagram") || lowerLabel.includes("instagram")) {
    return "fa-brands fa-instagram";
  } else if (url.includes("twitter") || lowerLabel.includes("twitter")) {
    return "fa-brands fa-twitter";
  } else if (url.includes("linkedin") || lowerLabel.includes("linkedin")) {
    return "fa-brands fa-linkedin";
  } else if (url.includes("tiktok") || lowerLabel.includes("tiktok")) {
    return "fa-brands fa-tiktok";
  } else if (url.includes("youtube") || lowerLabel.includes("youtube")) {
    return "fa-brands fa-youtube";
  } else if (url.includes("pinterest") || lowerLabel.includes("pinterest")) {
    return "fa-brands fa-pinterest";
  } else if (url.includes("whatsapp") || lowerLabel.includes("whatsapp")) {
    return "fa-brands fa-whatsapp";
  } else if (url.includes("snapchat") || lowerLabel.includes("snapchat")) {
    return "fa-brands fa-snapchat";
  } else if (url.includes("twitch") || lowerLabel.includes("twitch")) {
    return "fa-brands fa-twitch";
  } else if (url.includes("reddit") || lowerLabel.includes("reddit")) {
    return "fa-brands fa-reddit";
  } else if (url.includes("discord") || lowerLabel.includes("discord")) {
    return "fa-brands fa-discord";
  } else if (url.includes("telegram") || lowerLabel.includes("telegram")) {
    return "fa-brands fa-telegram";
  } else {
    return "fa-solid fa-globe";
  }
};