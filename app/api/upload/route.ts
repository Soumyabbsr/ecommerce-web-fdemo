import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { uploadToCloudinary, isCloudinaryConfigured } from "@/lib/cloudinary";
import { getSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase";
import { isAdminAuthorized } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    // 1. Enforce Server-Side Admin Authorization
    if (!isAdminAuthorized(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin credentials required to upload images" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided in request" },
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
        const secureUrl = await uploadToCloudinary(buffer, "leafora_products");
        return NextResponse.json({
          success: true,
          url: secureUrl,
          provider: "cloudinary",
        });
      } catch (cloudErr: any) {
        console.warn("[Upload] Cloudinary upload notice, checking Supabase Storage fallback:", cloudErr?.message);
      }
    }

    const ext = file.name.split(".").pop() || "png";
    const filename = `img_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;

    // 2. Supabase Storage ('products' bucket) using server client
    const supabaseClient = getSupabaseServerClient();
    if (supabaseClient && isSupabaseConfigured()) {
      try {
        const { data: uploadData, error: uploadError } = await supabaseClient.storage
          .from("products")
          .upload(filename, buffer, {
            contentType: file.type,
            upsert: true,
          });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabaseClient.storage
            .from("products")
            .getPublicUrl(filename);

          return NextResponse.json({
            success: true,
            url: publicUrlData.publicUrl,
            provider: "supabase",
          });
        } else if (uploadError) {
          console.warn("[Upload] Supabase storage notice:", uploadError.message);
        }
      } catch (storageErr: any) {
        console.warn("[Upload] Supabase storage exception:", storageErr?.message);
      }
    }

    // 3. In serverless / Vercel production, NEVER attempt local disk writes (prevents EROFS)
    const isVercel = Boolean(process.env.VERCEL) || process.env.NODE_ENV === "production";
    if (isVercel) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Image upload storage is not configured. Please configure Cloudinary environment variables or create a public 'products' bucket in your Supabase project.",
        },
        { status: 500 }
      );
    }

    // 4. Local Development Only: disk write fallback
    try {
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
    } catch (fsErr: any) {
      console.error("[Upload] Local disk write error:", fsErr);
      return NextResponse.json(
        { success: false, error: `Local filesystem write failed: ${fsErr?.message}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("[Upload] Upload handler error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
