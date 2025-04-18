import { supabaseAdmin } from "@/utils/config";
import { extractIdFromRequest } from "@/utils/helpers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing Id" }, { status: 404 });
  }

  const { data, error } = await supabaseAdmin
    .from("business_cards")
    .select("logo, image, description, code_color, card_color, background_color, links")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.json({ businessCards: [] }, { status: 200 });
  }

  let parsedData = data;

  try {
    parsedData.links = parsedData.links?.length ? JSON.parse(parsedData.links) : [];
  } catch (e) {
    parsedData.links = [];
  }

  return NextResponse.json({ businessCard: parsedData }, { status: 200 });
}
