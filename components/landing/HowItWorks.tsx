"use client";

import React from "react";
import { Check, SunMedium, Droplets, CalendarCheck, Sparkles } from "lucide-react";

const BENEFITS = [
  "Stimulates natural pituitary growth hormone release",
  "Enhances bone mineralization & calcium absorption",
  "Nourishes deep tissues, cartilage & muscle tone",
  "Supports spinal decompression and posture alignment",
  "Zero side effects, 100% Ayurvedic & non-hormonal",
  "Dispatched across all India with Free Shipping",
  "Formulated with 15 certified organic herbal extracts",
  "Ministry of Ayush & GMP certified manufacturing",
];

export function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simple Daily Protocol</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2.5 tracking-tight">
            One Scoop A Day Is All It Takes
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mt-1.5 font-normal">
            A simple, effortless Ayurvedic daily routine — zero complicated diets or synthetic supplements.
          </p>
        </div>

        {/* Visual Graphic Container */}
        <div className="max-w-3xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 mb-8 sm:mb-10">
          <img
            src="https://heightveda.com/wp-content/uploads/2026/09/ChatGPT-Image-Sep-10-2026-12_39_01-PM.webp"
            alt="How to use Height Veda"
            className="w-full h-auto object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/900x450/eaf7f0/16341f?text=Height+Veda+Routine";
            }}
          />
        </div>

        {/* Dose Strip Card */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#16341f] text-white p-5 sm:p-8 md:p-9 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 mb-10 sm:mb-12">
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-300">
              Consistency is the key to natural growth.
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 mt-1.5 leading-relaxed font-normal">
              Same time, same daily routine — that gives your bones, spinal discs, and pituitary gland the optimal foundation to thrive.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full md:w-auto">
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md text-center border border-white/10 flex flex-col items-center justify-center">
              <SunMedium className="w-4 h-4 text-emerald-300 mb-1" />
              <div className="text-xl sm:text-2xl font-extrabold text-white">1</div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mt-0.5">
                Scoop / Day
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md text-center border border-white/10 flex flex-col items-center justify-center">
              <Droplets className="w-4 h-4 text-emerald-300 mb-1" />
              <div className="text-xl sm:text-2xl font-extrabold text-white">200ml</div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mt-0.5">
                Warm Milk
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md text-center border border-white/10 flex flex-col items-center justify-center">
              <CalendarCheck className="w-4 h-4 text-emerald-300 mb-1" />
              <div className="text-xl sm:text-2xl font-extrabold text-white">45–90</div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mt-0.5">
                Days Cycle
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Continuous Marquee */}
        <div className="w-full overflow-hidden bg-emerald-50/70 border border-emerald-200/60 rounded-xl sm:rounded-2xl py-3.5">
          <div className="animate-marquee flex items-center space-x-6 sm:space-x-8 whitespace-nowrap">
            {BENEFITS.concat(BENEFITS).map((benefit, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-2xs text-xs font-semibold text-gray-800 border border-emerald-100"
              >
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 text-emerald-700 stroke-[3]" />
                </span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
