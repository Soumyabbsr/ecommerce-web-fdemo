import React from "react";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { CheckCircle, Truck, Package, PhoneCall, ArrowRight } from "lucide-react";
import { getOrders } from "@/lib/db";

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const orders = await getOrders();
  const order = orders.find((o) => o.order_number === orderNumber);

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-200/80 text-center animate-in fade-in duration-300">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle className="w-12 h-12" />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Order Confirmed
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3">
            Thank You for Choosing Leafora Herbal Private Limited!
          </h1>

          <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
            Your booking has been registered successfully. Our dispatch team is preparing your package for express shipment.
          </p>

          {/* Details Box */}
          <div className="my-8 p-5 rounded-2xl bg-gray-50 border border-gray-200 text-left text-xs sm:text-sm space-y-2.5">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500 font-medium">Order Number:</span>
              <span className="font-mono font-extrabold text-emerald-900">{orderNumber}</span>
            </div>

            {order && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Customer:</span>
                  <span className="font-bold text-gray-900">{order.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Phone:</span>
                  <span className="font-bold text-gray-900">{order.customer_phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Product:</span>
                  <span className="font-bold text-gray-900">{order.product_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Payment Mode:</span>
                  <span className="font-bold text-gray-900">{order.payment_method}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="text-gray-700 font-bold">Total Amount:</span>
                  <span className="font-black text-emerald-800 text-base">
                    ₹{order.total_amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Delivery Note */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-center gap-2 mb-8">
            <Truck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>Estimated delivery in <strong>3 to 5 business days</strong> with live SMS tracking.</span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 py-3.5 px-6 rounded-2xl bg-[#16341f] hover:bg-[#0f2415] text-white font-extrabold text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              <span>Return to Store</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="tel:07313626447"
              className="py-3.5 px-6 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-700" />
              <span>Need Help?</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
