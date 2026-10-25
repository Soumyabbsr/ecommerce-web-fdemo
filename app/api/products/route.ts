import { NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category") || undefined;
    const inStock = searchParams.has("inStock") ? searchParams.get("inStock") === "true" : undefined;
    const limit = searchParams.has("limit") ? Number(searchParams.get("limit")) : undefined;
    const offset = searchParams.has("offset") ? Number(searchParams.get("offset")) : undefined;

    const products = await getProducts({ search, category, inStock, limit, offset });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.price || !body.image_url) {
      return NextResponse.json(
        { success: false, error: "Product name, selling price, and image URL are required" },
        { status: 400 }
      );
    }

    const price = Number(body.price);
    const originalPrice = Number(body.original_price || body.price);
    const saveAmount = Math.max(0, originalPrice - price);
    const discountPercent =
      originalPrice > 0 ? Math.round((saveAmount / originalPrice) * 100) : 0;

    const newProduct = await createProduct({
      name: body.name.trim(),
      slug: body.slug ? body.slug.trim() : undefined,
      tagline: body.tagline || "",
      sku: body.sku?.trim() || `HV-SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      description: body.description || "",
      description_sections: Array.isArray(body.description_sections) ? body.description_sections : [],
      description_images: Array.isArray(body.description_images) ? body.description_images : [],
      images: Array.isArray(body.images) && body.images.length > 0 ? body.images : [body.image_url],
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      dosage: body.dosage || "",
      ingredients_list: Array.isArray(body.ingredients_list) ? body.ingredients_list : [],
      price,
      original_price: originalPrice,
      save_amount: saveAmount,
      discount_percent: discountPercent,
      image_url: body.image_url,
      badge: body.badge || "",
      is_featured: Boolean(body.is_featured),
      in_stock: body.in_stock !== undefined ? Boolean(body.in_stock) : true,
      stock_quantity: body.stock_quantity !== undefined ? Number(body.stock_quantity) : 100,
      category: body.category || "Full Kit",
      category_id: body.category_id || undefined,
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
