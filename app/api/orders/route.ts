import { NextResponse } from "next/server";
import { getOrders, createOrder } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;
    const paymentMethod = searchParams.get("paymentMethod") || undefined;

    const orders = await getOrders({ status, search, paymentMethod });
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error("[API] Failed to fetch orders:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customer_name || !body.customer_name.trim()) {
      return NextResponse.json(
        { success: false, error: "Customer name is required" },
        { status: 400 }
      );
    }

    if (!body.customer_phone || !body.customer_phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Customer 10-digit phone number is required" },
        { status: 400 }
      );
    }

    if (!body.address || !body.address.trim()) {
      return NextResponse.json(
        { success: false, error: "Delivery address is required" },
        { status: 400 }
      );
    }

    if (!body.pincode || !body.pincode.trim()) {
      return NextResponse.json(
        { success: false, error: "6-digit delivery pincode is required" },
        { status: 400 }
      );
    }

    const totalAmount = Number(body.total_amount || 0);
    if (isNaN(totalAmount) || totalAmount < 0) {
      return NextResponse.json(
        { success: false, error: "Order total amount must be a positive number" },
        { status: 400 }
      );
    }

    const newOrder = await createOrder({
      customer_name: body.customer_name.trim(),
      customer_phone: body.customer_phone.trim(),
      customer_email: body.customer_email?.trim() || "",
      address: body.address.trim(),
      city: body.city?.trim() || "Not Specified",
      state: body.state?.trim() || "India",
      pincode: body.pincode.trim(),
      product_id: body.product_id || "prod-josh-1000",
      product_name: body.product_name || "Leafora Herbal Formulation",
      quantity: Math.max(1, Number(body.quantity || 1)),
      total_amount: totalAmount,
      discount_amount: Math.max(0, Number(body.discount_amount || 0)),
      payment_method: body.payment_method === "Prepaid" ? "Prepaid" : "COD",
      payment_status: body.payment_status || (body.payment_method === "Prepaid" ? "Paid" : "Pending"),
      status: body.status || "Pending",
      courier_partner: body.courier_partner || "Delhivery Surface",
      tracking_number: body.tracking_number || "",
      notes: body.notes || "",
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error: any) {
    console.error("[API] Failed to create order:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to place order in database" },
      { status: 500 }
    );
  }
}
