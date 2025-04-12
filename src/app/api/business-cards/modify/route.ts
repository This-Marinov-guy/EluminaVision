import { NextResponse } from "next/server";
import multer from "multer";
import { supabase } from "@/utils/config";
import { extractIdFromRequest } from "@/utils/helpers";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const userId = extractIdFromRequest(req.headers.get("authorization"));

  return new Promise((resolve, reject) => {
    upload.fields([{ name: "logo" }, { name: "image" }])(req, null, async (err) => {
      if (err) {
        return resolve(NextResponse.json({ error: err.message }, { status: 400 }));
      }

      // Ensure both files are uploaded
      const { logo, image } = req.files;

      try {
        const logoFileName = `${userId}-logo-${id}`;
        const imageFileName = `${userId}-image-${id}`;

        const { error: logoError } = await supabase.storage
          .from("business-cards-bucket") 
          .upload(logoFileName, logo, {
            contentType: logo[0].mimetype,
            upsert: true,
          });

        const { error: imageError } = await supabase.storage
          .from("business-cards-bucket") 
          .upload(imageFileName, image, {
            contentType: image[0].mimetype,
            upsert: true,
          });

        if (logoError || imageError) {
          return resolve(NextResponse.json({ error: "Error uploading files to Supabase" }, { status: 500 }));
        }

        // Get public URLs of uploaded files
        const { data: { publicUrl: logoURL } } = supabase.storage.from("business-cards-bucket").getPublicUrl(logoFileName);

        const { data: { publicUrl: imageURL } } = supabase.storage.from("business-cards-bucket").getPublicUrl(imageFileName);

        // Update the business card in the database with new URLs



        // Return successful response with success message
        return resolve(
          NextResponse.json(
            { status: true, message: "Card updated successfully" },
            { status: 200 },
          ),
        );
      } catch (error) {
        return resolve(NextResponse.json({ error: "Error processing files" }, { status: 500 }));
      }
    });
  });
}
