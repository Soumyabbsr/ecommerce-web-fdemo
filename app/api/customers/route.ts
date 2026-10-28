import { NextResponse } from "next/server";
import { getCustomers } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    if (!isAdminAuthorized(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin credentials required to view customers" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("search") || undefined;

    const customers = await getCustomers(q);
    return NextResponse.json({ success: true, customers });
  } catch (error: any) {
    console.error("[API] Failed to fetch customers:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load customers" },
      { status: 500 }
    );
  }
}
