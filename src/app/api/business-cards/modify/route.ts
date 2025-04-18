import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/config";
import { extractIdFromRequest } from "@/utils/helpers";

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const userId = extractIdFromRequest(req.headers.get("authorization"));

  if (!userId) {
    return NextResponse.json({ status: false, message: "Unauthorized access" }, { status: 403 });
  }

  if (!id) {
    return NextResponse.json({ status: false, message: "Business Card ID is required" }, { status: 400 });
  }

  try {
    const formData = await req.formData();

    // Initialize updatedData object for database
    const updatedData: any = {};

    // Process text fields
    if (formData.has("description")) {
      updatedData.description = formData.get("description");
    }

    if (formData.has("background_color")) {
      updatedData.background_color = formData.get("background_color");
    }

    if (formData.has("card_color")) {
      updatedData.card_color = formData.get("card_color");
    }

    if (formData.has("code_color")) {
      updatedData.code_color = formData.get("code_color");
    }

    if (formData.has("links")) {
      // Parse the JSON string into an object
      updatedData.links = formData.get("links");
    }

    // Process logo file if it exists
    const logo = formData.get("logo");
    if (logo && logo.size > 0) {
      const logoFileName = `${userId}-logo-${id}`;
      const logoBuffer = await logo.arrayBuffer();

      const { error: logoError } = await supabaseAdmin.storage
        .from("business-cards-bucket")
        .upload(logoFileName, logoBuffer, {
          contentType: logo.type,
          upsert: true,
        });

      if (logoError) {
        console.error("Logo upload error:", logoError);
        return NextResponse.json({ status: false, error: "Error uploading logo" }, { status: 500 });
      }

      // Get public URL
      const { data: logoData } = supabaseAdmin.storage.from("business-cards-bucket").getPublicUrl(logoFileName);

      updatedData.logo = logoData.publicUrl;
    }

    // Process image file if it exists
    const image = formData.get("image");
    if (image && image.size > 0) {
      const imageFileName = `${userId}-image-${id}`;
      const imageBuffer = await image.arrayBuffer();

      const { error: imageError } = await supabaseAdmin.storage
        .from("business-cards-bucket")
        .upload(imageFileName, imageBuffer, {
          contentType: image.type,
          upsert: true,
        });

      if (imageError) {
        console.error("Image upload error:", imageError);
        return NextResponse.json({ status: false, error: "Error uploading image" }, { status: 500 });
      }

      // Get public URL
      const { data: imageData } = supabaseAdmin.storage.from("business-cards-bucket").getPublicUrl(imageFileName);

      updatedData.image = imageData.publicUrl;
    }

    // Only update database if there's data to update
    if (Object.keys(updatedData).length > 0) {
      const { error: updateError } = await supabaseAdmin
        .from("business_cards")
        .update(updatedData)
        .eq("id", id)
        .eq("user_id", userId);

      if (updateError) {
        console.error("Database update error:", updateError);
        return NextResponse.json({ status: false, error: "Error updating business card" }, { status: 500 });
      }
    } else {
      return NextResponse.json({ status: false, message: "No data provided for update" }, { status: 400 });
    }

    return NextResponse.json(
      {
        status: true,
        message: "Card updated successfully",
        data: updatedData,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Request processing error:", error);
    return NextResponse.json({ status: false, error: "Error processing request" }, { status: 500 });
  }
}
