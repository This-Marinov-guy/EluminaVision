import { resetAndWriteToGoogleSheet } from "@/server/google/spreadsheet-service";
import { supabase } from "@/utils/config";
import { QR_CODE_DOMAIN, QRS_GOOGLE_SHEET_ID } from "@/utils/defines";
import { extractIdFromRequest } from "@/utils/helpers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { data, error } = await supabase.from("qr_codes").select("id, link");

  if (error || !data) {
    return NextResponse.json({ qrCodes: [] }, { status: 200 });
  }

  const formattedItems = data.map((item) => {
    return {
      qrLink: QR_CODE_DOMAIN + item.id,
      redirect: item.link,
    };
  });

  try {
    await resetAndWriteToGoogleSheet(formattedItems, QRS_GOOGLE_SHEET_ID);

    return NextResponse.json({ message: "Successfully loaded qr codes" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }
}
