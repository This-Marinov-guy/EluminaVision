import { supabaseAdmin } from "@/utils/config";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const { newLink } = await req.json();

  if (!id || !newLink) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("qr_codes").update({ link: newLink }).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ status: true, message: "Link updated successfully" }, { status: 200 });
}
