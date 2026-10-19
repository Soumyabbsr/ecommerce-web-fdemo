"use client";

import React from "react";
import { X, Calendar, CheckCircle2 } from "lucide-react";

interface EmiModalProps {
  isOpen: boolean;
  onClose: () => void;
  price: number;
  productName: string;
}

export function EmiModal({ isOpen, onClose, price, productName }: EmiModalProps) {
  if (!isOpen) return null;

  const monthly = Math.ceil(price / 3);
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
  const inTwoMonths = new Date(now.getFullYear(), now.getMonth() + 2, now.getDate()).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {productName}
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 mt-3">
            Illustrative Plan
          </h2>
          <p className="text-3xl font-black text-emerald-700 mt-1">
            ₹{monthly.toLocaleString("en-IN")} <span className="text-sm font-semibold text-gray-500">Today</span>
          </p>
        </div>

        {/* 3 Installment Boxes */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center">
            <h3 className="text-lg font-extrabold text-emerald-900">₹{monthly.toLocaleString("en-IN")}</h3>
            <p className="text-xs font-semibold text-emerald-700 mt-1">Today</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-center">
            <h3 className="text-lg font-extrabold text-gray-800">₹{monthly.toLocaleString("en-IN")}</h3>
            <p className="text-xs font-semibold text-gray-500 mt-1">{nextMonth}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-center">
            <h3 className="text-lg font-extrabold text-gray-800">₹{monthly.toLocaleString("en-IN")}</h3>
            <p className="text-xs font-semibold text-gray-500 mt-1">{inTwoMonths}</p>
          </div>
        </div>

        {/* Total Value */}
        <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-gray-100 font-bold text-sm mb-6">
          <span className="text-gray-600">Total Order Value</span>
          <span className="text-gray-900 text-base">₹{price.toLocaleString("en-IN")}</span>
        </div>

        {/* Features / Details */}
        <div className="grid grid-cols-3 gap-2 text-[11px] text-gray-600 font-medium mb-6">
          <div className="p-2 bg-gray-50 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
            <span>3 Easy Installments</span>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg">
            <Calendar className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
            <span>Provider approval required</span>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
            <span>UPI / Card eligibility</span>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-gray-400">
          Check available EMI terms on the payment screen. Actual EMI availability, charges, and dates depend on your bank/payment provider.
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-[#16341f] text-white font-bold rounded-xl hover:bg-[#0e2214] transition"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
