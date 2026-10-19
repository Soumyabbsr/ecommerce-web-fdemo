import { NextResponse } from "next/server";
import { getOrderById, updateOrder, deleteOrder } from "@/lib/db";
import { OrderStatus, PaymentStatus } from "@/lib/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Failed to fetch order:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updates: Record<string, unknown> = {};

    if (body.status) updates.status = body.status as OrderStatus;
    if (body.payment_status) updates.payment_status = body.payment_status as PaymentStatus;
    if (body.tracking_number !== undefined) updates.tracking_number = body.tracking_number;
    if (body.courier_partner !== undefined) updates.courier_partner = body.courier_partner;
    if (body.estimated_delivery !== undefined) updates.estimated_delivery = body.estimated_delivery;
    if (body.notes !== undefined) updates.notes = body.notes;
    if (body.address !== undefined) updates.address = body.address;
    if (body.customer_name !== undefined) updates.customer_name = body.customer_name;
    if (body.customer_phone !== undefined) updates.customer_phone = body.customer_phone;

    const updated = await updateOrder(id, updates);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Order not found or update failed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error("Failed to update order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteOrder(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: "Order not found or delete failed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Order deleted" });
  } catch (error) {
    console.error("Failed to delete order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete order" },
      { status: 500 }
    );
  }
}
