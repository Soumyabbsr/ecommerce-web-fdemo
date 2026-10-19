"use client";

import React from "react";
import { Users, Star, ShieldCheck, Sparkles } from "lucide-react";

export function About() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white border-y border-gray-100" id="about-sec">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Label */}
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>About Height Veda</span>
        </span>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-3 tracking-tight">
          What is <span className="text-gradient-green">Height Veda?</span>
        </h2>

        {/* Intro */}
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-2 leading-relaxed font-normal">
          Height Veda is an authentic Ayurvedic body growth formulation crafted with 15 balanced, standardized botanicals and bioavailable minerals for children, teenagers, women, and men between ages 12–35.
        </p>

        {/* Hindi Highlight Card with Stats */}
        <div className="mt-8 sm:mt-10 p-6 sm:p-9 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#16341f] via-[#102a18] to-[#0c1f12] text-white shadow-lg relative overflow-hidden text-center">
          {/* Subtle background glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <h3 className="text-xl sm:text-2xl font-bold text-emerald-300 mb-2 tracking-wide">
            Height Veda काम कैसे करता है?
          </h3>

          <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto leading-relaxed mb-6 font-normal">
            <strong className="text-white font-semibold">Height Veda</strong> में मौजूद 15 शुद्ध सुपर हर्ब्स शरीर को वो सभी प्राकृतिक पोषक तत्व प्रदान करती हैं, जो{" "}
            <strong className="text-emerald-300 font-semibold">Height Growth</strong> और रीढ़ की हड्डी के समुचित विकास के लिए आवश्यक हैं।
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 pt-5 border-t border-emerald-800/60 max-w-lg mx-auto">
            <div className="flex flex-col items-center">
              <Users className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-xl sm:text-2xl font-extrabold text-white">10,000+</span>
              <span className="text-[11px] font-medium text-emerald-300 mt-0.5">Happy Users</span>
            </div>
            <div className="flex flex-col items-center border-x border-emerald-800/60">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 mb-1" />
              <span className="text-xl sm:text-2xl font-extrabold text-amber-400">4.9 / 5.0</span>
              <span className="text-[11px] font-medium text-emerald-300 mt-0.5">Rating</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-400">100%</span>
              <span className="text-[11px] font-medium text-emerald-300 mt-0.5">Ayurvedic</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
