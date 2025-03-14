import { supabase } from "@/utils/config";
import { extractIdFromRequest } from "@/utils/helpers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { id } = await req.json();

  const userId = extractIdFromRequest(req.headers.get("authorization"));

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  if (!id) {
    return NextResponse.json({ error: "QR Code ID is required" }, { status: 400 });
  }

  const { data: qrCode, error: fetchError } = await supabase
    .from("qr_codes")
    .select("id, status, user_id")
    .eq("id", id)
    .single();

  if (fetchError || !qrCode) {
    return NextResponse.json({ error: "QR Code not found" }, { status: 404 });
  }

  const { error: updateError } = await supabase.from("qr_codes").update({ status: 2, user_id: userId }).eq("id", id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ status: true, message: "QR Code claimed successfully" }, { status: 200 });
}
