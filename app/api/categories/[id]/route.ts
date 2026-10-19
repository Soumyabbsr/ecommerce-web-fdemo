import { NextResponse } from "next/server";
import { getCategoryById, updateCategory, deleteCategory } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await getCategoryById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load category" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyAdminRequest(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin privileges required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const updated = await updateCategory(id, {
      name: body.name?.trim(),
      slug: body.slug?.trim(),
      description: body.description,
      image_url: body.image_url,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Category not found or update failed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, category: updated });
  } catch (error) {
    console.error("Failed to update category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update category" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!verifyAdminRequest(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin privileges required" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const success = await deleteCategory(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Category not found or delete failed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error("Failed to delete category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
