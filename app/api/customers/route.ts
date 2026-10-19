import { NextResponse } from "next/server";
import { getCustomers } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("search") || undefined;

    const customers = await getCustomers(q);
    return NextResponse.json({ success: true, customers });
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load customers" },
      { status: 500 }
    );
  }
}
