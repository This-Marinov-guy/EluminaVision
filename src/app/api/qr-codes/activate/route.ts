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
  const { data, error } = await supabase
    .from("qr_codes")
    .select("id, status, user_id")
    .ilike("id", `${prefix}%`)
    .eq("status", 1)
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ status: false, message: "QR Code not found or already activated" }, { status: 404 });
  }

  try {
    const { error } = await supabase.from("qr_codes").update({ status: 2, user_id: userId }).eq("id", id);

    if (error) {
      return NextResponse.json({ status: false, message: error.message }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ status: true, message: "QR Code claimed successfully" }, { status: 200 });
}
