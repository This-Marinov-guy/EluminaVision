import { supabase } from "@/utils/config";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  

  return NextResponse.json({ status: true, message: "Card updated successfully" }, { status: 200 });
}
