import { supabase } from "@/utils/config";
import { extractIdFromRequest } from "@/utils/helpers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const userId = extractIdFromRequest(req.headers.get("authorization"));

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  const { data, error } = await supabase.from("qr_codes").select("id, link").eq("user_id", userId);

  if (error || !data) {
    return NextResponse.json({ qrCodes: [] }, { status: 200 });
  }

  return NextResponse.json({ qrCodes: data }, { status: 200 });
}
