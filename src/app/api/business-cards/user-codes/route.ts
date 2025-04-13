import { supabaseAdmin } from "@/utils/config";
import { extractIdFromRequest } from "@/utils/helpers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const userId = extractIdFromRequest(req.headers.get("authorization"));

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
  }

  const { data, error } = await supabaseAdmin
    .from("business_cards")
    .select("id, redirect_url, logo, image, description, code_color, background_color, links")
    .eq("user_id", userId);

  if (error || !data) {
    return NextResponse.json({ businessCards: [] }, { status: 200 });
  }

  const parsedData = data.map((item) => {
    const parsedItem = { ...item };

    try {
      parsedItem.links = item.links?.length ? JSON.parse(item.links) : [];
    } catch (e) {
      parsedItem.links = [];
    }

    return parsedItem;
  });

  return NextResponse.json({ businessCards: parsedData }, { status: 200 });
}
