import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import {
  Truck,
  ShieldCheck,
  PhoneCall,
  Clock,
  PackageCheck,
  MapPin,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Building,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | Leafora Herbal Private Limited",
  description:
    "Official Shipping Policy of Leafora Herbal Private Limited. 100% Free Express Pan-India Delivery, COD, transit timelines, and courier partners.",
};

export default function ShippingPolicyPage() {
  const lastUpdated = "27 October 2026";

  return (
    <article className="space-y-8 bg-white p-6 sm:p-10 md:p-12 rounded-3xl border border-gray-200 shadow-xs text-gray-800">
      {/* Policy Heading */}
      <div className="border-b border-gray-200 pb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 border border-emerald-300">
            <Truck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Pan-India Express Logistics</span>
          </span>
          <span className="text-xs font-semibold text-gray-500">
            Last Updated: {lastUpdated}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
          Shipping &amp; Delivery Policy
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          At <strong>Leafora Herbal Private Limited</strong>, we are committed to delivering authentic Ayurvedic wellness formulations swiftly, safely, and discreetly to every pin code across India. Read our shipping policy below or contact our logistics helpline at <strong>+91 8630552164</strong> for real-time tracking assistance.
        </p>
      </div>

      {/* 4 Pillars of Shipping */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5 font-bold">
            <Truck className="w-4 h-4 text-emerald-800" />
          </div>
          <h3 className="font-extrabold text-sm text-gray-900">100% FREE Shipping</h3>
          <p className="text-xs text-gray-600 mt-1">
            Zero delivery charges on all orders across India, whether Prepaid or Cash on Delivery.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5 font-bold">
            <Clock className="w-4 h-4 text-emerald-800" />
          </div>
          <h3 className="font-extrabold text-sm text-gray-900">24-48 Hr Dispatch</h3>
          <p className="text-xs text-gray-600 mt-1">
            Orders confirmed before 2:00 PM are processed and dispatched on the same business day.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5 font-bold">
            <PackageCheck className="w-4 h-4 text-emerald-800" />
          </div>
          <h3 className="font-extrabold text-sm text-gray-900">Discreet Packaging</h3>
          <p className="text-xs text-gray-600 mt-1">
            Tamper-proof, opaque corrugated carton boxes protecting your privacy and product integrity.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/90 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
          </div>
          <h3 className="font-extrabold text-sm text-gray-900">Live SMS Tracking</h3>
          <p className="text-xs text-gray-600 mt-1">
            Real-time tracking link delivered straight to your registered mobile number via SMS.
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-black flex items-center justify-center shrink-0">
            1
          </span>
          <span>Coverage &amp; Delivery Locations</span>
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed font-normal">
          Leafora Herbal Private Limited ships across all 28 states and 8 union territories in India, covering 19,000+ PIN codes through Tier-1 surface and air logistics networks. Currently, we do not service international shipping outside India.
        </p>
      </section>

      {/* Section 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-black flex items-center justify-center shrink-0">
            2
          </span>
          <span>Estimated Transit Timelines</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border border-gray-200 rounded-2xl overflow-hidden">
            <thead className="bg-[#16341f] text-white font-bold text-xs">
              <tr>
                <th className="p-3.5">Destination Region</th>
                <th className="p-3.5">Estimated Delivery Time</th>
                <th className="p-3.5">Primary Logistics Carrier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-gray-50/50 text-gray-700">
              <tr>
                <td className="p-3.5 font-semibold text-gray-900">Metro Cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata)</td>
                <td className="p-3.5 text-emerald-800 font-bold">2 to 4 Business Days</td>
                <td className="p-3.5">BlueDart Express / Delhivery Air</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-gray-900">Tier-1 &amp; Tier-2 Cities (Jaipur, Pune, Ahmedabad, Lucknow, Chandigarh, Surat)</td>
                <td className="p-3.5 text-emerald-800 font-bold">3 to 5 Business Days</td>
                <td className="p-3.5">Delhivery Surface / Shadowfax</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-gray-900">Tier-3 Towns, Rural Districts &amp; North East Regions</td>
                <td className="p-3.5 text-emerald-800 font-bold">4 to 7 Business Days</td>
                <td className="p-3.5">Ekart Logistics / DTDC Express</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 italic">
          *Note: Timelines may vary marginally during regional public holidays, extreme weather advisories, or local festive peaks.
        </p>
      </section>

      {/* Section 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-black flex items-center justify-center shrink-0">
            3
          </span>
          <span>Cash on Delivery (COD) Guidelines</span>
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed font-normal">
          For all Cash on Delivery (COD) bookings:
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Zero extra COD fee or hidden collection charge. You only pay the exact printed invoice amount.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Please keep the exact cash amount ready or ask the delivery agent for their verified UPI QR scanner upon delivery.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>The courier associate will attempt delivery up to 3 times before returning the parcel to our central warehouse.</span>
          </li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
          <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-black flex items-center justify-center shrink-0">
            4
          </span>
          <span>Order Tracking &amp; Delivery Support</span>
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed font-normal">
          Once your package is handed over to our courier partners, an automated SMS notification containing your unique AWB Tracking Code is sent to your registered phone number.
        </p>
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs sm:text-sm space-y-2">
          <p className="font-bold text-gray-900">
            Need urgent delivery rescheduling, address modification, or tracking assistance?
          </p>
          <p className="text-gray-600">
            Call our logistics desk at <strong>+91 8630552164</strong> (8630552164) with your order number. We will coordinate directly with the delivery executive to ensure timely delivery.
          </p>
        </div>
      </section>
    </article>
  );
}
