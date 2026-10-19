import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validation: Type check
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "image/avif",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Only JPG, PNG, WEBP, GIF, AVIF, and SVG images are supported" },
        { status: 400 }
      );
    }

    // Validation: Max size 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "Image file exceeds 10MB size limit" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Prioritize Cloudinary if configured
    if (isCloudinaryConfigured()) {
      try {
        const secureUrl = await uploadToCloudinary(buffer, "heightveda_products");
        return NextResponse.json({
          success: true,
          url: secureUrl,
          provider: "cloudinary",
        });
      } catch (cloudErr) {
        console.warn("Cloudinary upload failed, falling back to storage/local:", cloudErr);
      }
    }

    const ext = file.name.split(".").pop() || "png";
    const filename = `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;

    // 2. Fallback to Supabase Storage if configured
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("products")
          .upload(filename, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from("products")
            .getPublicUrl(filename);

          return NextResponse.json({
            success: true,
            url: publicUrlData.publicUrl,
            provider: "supabase",
          });
        }
      } catch (storageErr) {
        console.warn("Supabase storage upload failed, falling back to local:", storageErr);
      }
    }

    // 3. Guaranteed Local File System Fallback
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      provider: "local",
    });
  } catch (error) {
    console.error("Upload handler error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
