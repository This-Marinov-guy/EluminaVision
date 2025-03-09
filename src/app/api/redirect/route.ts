import { supabase } from "@/utils/config";
import { NextResponse } from "next/server"; // For App Router

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }
  
  const { data, error } = await supabase.from("qr_codes").select("link").eq("id", id).maybeSingle();
  
  if (error || !data?.link) {
    return NextResponse.json({ error: "QR Code not found" }, { status: 404 });
  }

  return NextResponse.redirect(data.link, 301);
}
