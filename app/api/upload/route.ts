import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, studentId = "guest", lessonNo = 1 } = body;

    if (!imageBase64) {
      return NextResponse.json({ success: false, message: "No image provided" }, { status: 400 });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");

    const fileName = `drawing_${studentId}_${lessonNo}_${Date.now()}.png`;
    const localDir = path.join(process.cwd(), "public", "uploads", "drawings");
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }

    const localFilePath = path.join(localDir, fileName);
    fs.writeFileSync(localFilePath, buffer);

    let finalUrl = `/uploads/drawings/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("mindplay-drawings")
        .upload(`drawings/${fileName}`, buffer, {
          contentType: "image/png",
          upsert: true
        });

      if (!uploadError) {
        const { data } = supabase.storage.from("mindplay-drawings").getPublicUrl(`drawings/${fileName}`);
        if (data?.publicUrl) {
          finalUrl = data.publicUrl;
        }
      }
    } catch (e) {
      // Fallback to local URL
    }

    return NextResponse.json({
      success: true,
      url: finalUrl,
      sizeBytes: buffer.length
    });
  } catch (err: any) {
    console.error("Upload handler error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
