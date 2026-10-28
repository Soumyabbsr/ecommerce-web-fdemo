import { NextResponse } from "next/server";
import { getOrderById, updateOrder, deleteOrder } from "@/lib/db";
import { OrderStatus, PaymentStatus } from "@/lib/types";
import { isAdminAuthorized } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Order identifier is required" },
        { status: 400 }
      );
    }

    const order = await getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    console.error("[API] Failed to fetch order:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Enforce Server-Side Admin Authorization
    if (!isAdminAuthorized(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin privileges required to update orders" },
        { status: 401 }
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Order ID parameter is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (body.status) updates.status = body.status as OrderStatus;
    if (body.payment_status) updates.payment_status = body.payment_status as PaymentStatus;
    if (body.tracking_number !== undefined) updates.tracking_number = String(body.tracking_number).trim();
    if (body.courier_partner !== undefined) updates.courier_partner = String(body.courier_partner).trim();
    if (body.estimated_delivery !== undefined) updates.estimated_delivery = String(body.estimated_delivery).trim();
    if (body.notes !== undefined) updates.notes = String(body.notes);
    if (body.address !== undefined) updates.address = String(body.address).trim();
    if (body.customer_name !== undefined) updates.customer_name = String(body.customer_name).trim();
    if (body.customer_phone !== undefined) updates.customer_phone = String(body.customer_phone).trim();

    const updated = await updateOrder(id, updates);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: `Order "${id}" not found or update failed` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error: any) {
    console.error("[API] Failed to update order:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update order in database" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Enforce Server-Side Admin Authorization
    if (!isAdminAuthorized(request)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin privileges required to delete orders" },
        { status: 401 }
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Order ID parameter is required" },
        { status: 400 }
      );
    }

    const success = await deleteOrder(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: `Order "${id}" not found or delete failed` },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: `Order ${id} deleted successfully` });
  } catch (error: any) {
    console.error("[API] Failed to delete order:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to delete order from database" },
      { status: 500 }
    );
  }
}
