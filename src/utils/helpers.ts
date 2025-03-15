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
