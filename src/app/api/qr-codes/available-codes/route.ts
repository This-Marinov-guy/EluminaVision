import { supabase } from "@/utils/config";
import { NextResponse } from "next/server";

export async function GET() {
  const LIMIT = 5;

  const { data, error } = await supabase.from("qr_codes").select("id").eq("status", 1).limit(LIMIT);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const exists = data.length === LIMIT;

  return NextResponse.json({ exists }, { status: 200 });
}
