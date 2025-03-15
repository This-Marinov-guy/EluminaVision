import { supabase } from "@/utils/config";
import { NextResponse } from "next/server";

export async function GET() {
  const LIMIT = 5;

  const { count, error } = await supabase
    .from("qr_codes")
    .select("*", { count: "exact", head: true }) // Only get the count, no actual data
    .eq("status", 1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ exists: count >= LIMIT }, { status: 200 });
}
