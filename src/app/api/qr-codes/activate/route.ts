import { supabase } from "@/utils/config";
import { extractIdFromRequest } from "@/utils/helpers";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { id } = await req.json();

  const userId = extractIdFromRequest(req.headers.get("authorization"));

  if (!userId) {
    return NextResponse.json({ status: false, message: "Unauthorized access" }, { status: 403 });
  }

  if (!id) {
    return NextResponse.json({ status: false, message: "QR Code ID is required" }, { status: 400 });
  }

const prefix = id.substring(0, 8);
const { data: qrCode, error: fetchError } = await supabase
  .from("qr_codes")
  .select("id, status, user_id")
  .or(`id.eq.${id},id.ilike.${prefix}%`)
  .eq("status", 1)
  .maybeSingle();

  if (fetchError || !qrCode) {
    return NextResponse.json({ status: false, message: "QR Code not found or already activated" }, { status: 404 });
  }

  const { error: updateError } = await supabase.from("qr_codes").update({ status: 2, user_id: userId }).eq("id", id);

  if (updateError) {
    return NextResponse.json({ status: false, message: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ status: true, message: "QR Code claimed successfully" }, { status: 200 });
}
