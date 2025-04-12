import { supabase } from "@/utils/config";
import { extractIdFromRequest } from "@/utils/helpers";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  if (!params.id) {
    return NextResponse.json({ error: "Missing Id" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("business_cards")
    .select("logo, image, description, background_color, links")
    .eq("id", params.id)
    .single();

  if (error || !data) {
    return NextResponse.json({ businessCards: [] }, { status: 200 });
  }

  let parsedData = data;
  
  try {
    parsedData.links = JSON.parse(parsedData.links);
  } catch (e) {
    parsedData.links = [];
  }

  return NextResponse.json({ businessCard: parsedData }, { status: 200 });
}
