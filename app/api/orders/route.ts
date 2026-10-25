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
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customer_name || !body.customer_phone || !body.address || !body.pincode) {
      return NextResponse.json(
        { success: false, error: "Full Name, Phone number, Address, and Pincode are required" },
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
      product_id: body.product_id || "prod-1",
      product_name: body.product_name || "Height Veda Kit",
      quantity: Number(body.quantity || 1),
      total_amount: Number(body.total_amount || 2499),
      discount_amount: Number(body.discount_amount || 0),
      payment_method: body.payment_method === "Prepaid" ? "Prepaid" : "COD",
      payment_status: body.payment_status || (body.payment_method === "Prepaid" ? "Paid" : "Pending"),
      status: body.status || "Pending",
      courier_partner: body.courier_partner || "Delhivery Surface",
      tracking_number: body.tracking_number || "",
      notes: body.notes || "",
    });

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json(
      { success: false, error: "Failed to place order" },
      { status: 500 }
    );
  }
}
