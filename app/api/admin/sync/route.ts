import { NextResponse } from "next/server";
import { syncLeaforaToSupabase } from "@/lib/db";
import { verifyAdminRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  try {
    const authResult = verifyAdminRequest(request);
    if (!authResult.authenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin privileges required" },
        { status: 401 }
      );
    }

    const result = await syncLeaforaToSupabase();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Admin sync error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to sync database" },
      { status: 500 }
    );
  }
}
