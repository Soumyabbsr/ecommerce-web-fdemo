import { NextResponse } from "next/server";
import { getSalesStats } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const stats = await getSalesStats();
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Failed to load analytics:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load sales stats" },
      { status: 500 }
    );
  }
}
