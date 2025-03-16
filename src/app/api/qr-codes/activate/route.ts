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

  const LIMIT = 8;
  const partialId = id.substring(0, LIMIT);

  if (partialId.length < LIMIT) {
    return NextResponse.json({ status: false, message: "Provide at least 8 symbols" }, { status: 400 });
  }

  const { data, error } = await supabase.rpc("find_qr_code_by_partial_id", {
    partial_id: partialId,
  });  

  if (error || data.length === 0) {
    return NextResponse.json({ status: false, message: "QR Code not found or already activated" }, { status: 404 });
  }

  try {
    const { error } = await supabase.from("qr_codes").update({ status: 2, user_id: userId }).eq("id", data[0].id);

    if (error) {
      return NextResponse.json({ status: false, message: error.message }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ status: true, message: "QR Code claimed successfully" }, { status: 200 });
}
