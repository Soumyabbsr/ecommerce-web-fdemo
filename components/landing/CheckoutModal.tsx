"use client";

import React, { useState } from "react";
import { X, CheckCircle, ShieldCheck, Truck, ArrowRight, Loader2 } from "lucide-react";
import { Product, Order } from "@/lib/types";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onOrderSuccess?: (order: Order) => void;
}

export function CheckoutModal({
  isOpen,
  onClose,
  product,
  onOrderSuccess,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
    paymentMethod: "COD" as "COD" | "Prepaid",
  });

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen || !product) return null;

  const prepaidDiscount = formData.paymentMethod === "Prepaid" ? 400 : 0;
  const subtotal = product.price * quantity;
  const finalTotal = Math.max(0, subtotal - prepaidDiscount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.address.trim() || !formData.pincode.trim()) {
      setError("Please provide your delivery address and 6-digit pincode.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_email: formData.email,
          address: formData.address,
          city: formData.city || "Local",
          state: formData.state || "India",
          pincode: formData.pincode,
          product_id: product.id,
          product_name: product.name,
          quantity,
          total_amount: finalTotal,
          discount_amount: prepaidDiscount,
          payment_method: formData.paymentMethod,
          notes: formData.notes,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to place order");
      }

      setConfirmedOrder(data.order);
      onOrderSuccess?.(data.order);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 my-8">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmedOrder ? (
          <div className="text-center py-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Booking Confirmed
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
              Thank You, {confirmedOrder.customer_name}!
            </h2>

            <p className="text-sm text-gray-600 mt-2">
              Your order for <strong>{confirmedOrder.product_name}</strong> has been received successfully.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-gray-50 border border-gray-200 text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-mono font-bold text-gray-900">{confirmedOrder.order_number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Amount:</span>
                <span className="font-bold text-emerald-700">₹{confirmedOrder.total_amount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Mode:</span>
                <span className="font-bold text-gray-900">{confirmedOrder.payment_method}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Address:</span>
                <span className="font-medium text-gray-800 text-right max-w-[220px]">
                  {confirmedOrder.address}, {confirmedOrder.city} - {confirmedOrder.pincode}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 mb-6 bg-emerald-50 py-2 rounded-xl">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Dispatches within 24 hours · Free delivery all over India</span>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 bg-[#16341f] text-white font-bold rounded-xl hover:bg-[#0f2415] transition shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 border-b border-gray-100 pb-4">
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-100/70 px-2.5 py-0.5 rounded-md">
                Fast Checkout
              </span>
              <h2 className="text-2xl font-black text-gray-900 mt-1">
                Complete Your Booking
              </h2>
              <p className="text-xs text-gray-500">
                100% genuine Ayurvedic formula shipped directly to your doorstep.
              </p>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50 border border-gray-200 mb-6">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-16 h-16 object-contain rounded-lg bg-white p-1 border border-gray-100"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/100x100/eaf7f0/16341f?text=HV";
                }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-sm truncate">{product.name}</h3>
                <p className="text-xs text-gray-500 truncate">{product.tagline}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-black text-emerald-800 text-base">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <del className="text-xs text-gray-400">
                    ₹{product.original_price.toLocaleString("en-IN")}
                  </del>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    Save ₹{product.save_amount}
                  </span>
                </div>
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-2 text-xs font-bold text-gray-800">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Mobile Number (10 digits) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Complete Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House/Flat No., Building name, Street, Landmark"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 302017"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Select Payment Option:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`flex items-start gap-3 p-3 rounded-2xl border-2 cursor-pointer transition ${
                      formData.paymentMethod === "Prepaid"
                        ? "border-emerald-600 bg-emerald-50/50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Prepaid"
                      checked={formData.paymentMethod === "Prepaid"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "Prepaid" })}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="text-xs font-extrabold text-emerald-900 flex items-center gap-1">
                        Prepaid (UPI/Card)
                        <span className="bg-emerald-600 text-white text-[10px] px-1 rounded">SAVE ₹400</span>
                      </div>
                      <div className="text-[11px] text-emerald-700">Flat ₹400 instant discount applied</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-3 p-3 rounded-2xl border-2 cursor-pointer transition ${
                      formData.paymentMethod === "COD"
                        ? "border-emerald-600 bg-emerald-50/50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "COD" })}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <div className="text-xs font-extrabold text-gray-900">Cash on Delivery</div>
                      <div className="text-[11px] text-gray-500">Pay cash upon home delivery</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="py-3 px-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-1.5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({quantity} item{quantity > 1 ? "s" : ""})</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {formData.paymentMethod === "Prepaid" && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Prepaid Instant Discount</span>
                    <span>-₹400</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping &amp; Delivery</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-black text-gray-900 pt-1.5 border-t border-gray-200">
                  <span>Total Payable:</span>
                  <span className="text-emerald-800 text-base">₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#16341f] hover:bg-[#0f2415] disabled:bg-gray-400 text-white font-extrabold text-base rounded-2xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Booking...</span>
                  </>
                ) : (
                  <>
                    <span>CONFIRM ORDER (₹{finalTotal.toLocaleString("en-IN")})</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Safe Checkout · Free Delivery · Verified Ayurvedic Product</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
