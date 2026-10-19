"use client";

import React from "react";
import Link from "next/link";
import { Shield, Heart, Award, Truck, Play, Leaf } from "lucide-react";

export function Hero({ onOpenCheckout }: { onOpenCheckout?: () => void }) {
  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-[#f7f5ef] via-[#faf8f2] to-white overflow-hidden">
      {/* Decorative background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 shadow-xs">
          <Leaf className="w-4 h-4 text-emerald-700" />
          <span>100% Ayurvedic · Clinically Tested</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.15] mb-4">
          <span className="text-gradient-green">Natural Height Growth</span>
          <br />
          &amp; Wellness Suite
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-8 font-normal">
          <strong className="font-bold text-gray-900">Elevate</strong> naturally.{" "}
          <strong className="font-bold text-gray-900">Boost</strong> confidence.{" "}
          <strong className="font-bold text-gray-900">Drive</strong> your potential.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/#hvProducts"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#16341f] hover:bg-[#0f2415] text-white font-extrabold text-base tracking-wide shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            Shop Now
          </Link>
          <Link
            href="#expertview"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#16341f] text-[#16341f] hover:bg-emerald-50 font-bold text-base transition"
          >
            <Play className="w-4 h-4 fill-[#16341f]" />
            <span>Watch Results</span>
          </Link>
        </div>

        {/* Hero Visual Display with Badges */}
        <div className="relative max-w-lg mx-auto mb-12">
          {/* Left Floating Badge */}
          <div className="animate-float absolute -top-4 -left-4 sm:-left-8 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-emerald-100 flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>10,000+ Happy Customers</span>
          </div>

          {/* Right Floating Badge */}
          <div className="animate-float [animation-delay:1.5s] absolute top-12 -right-4 sm:-right-8 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-emerald-100 flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Ayush Certified</span>
          </div>

          {/* Main Hero Product Image Container */}
          <div className="relative mx-auto rounded-3xl p-6 bg-gradient-to-b from-emerald-500/10 to-transparent flex items-center justify-center">
            <img
              src="https://heightveda.com/wp-content/uploads/2026/09/HV-C-P-1.webp"
              alt="Height Veda Body Growth Suite"
              className="w-full max-h-[380px] object-contain drop-shadow-2xl transform transition hover:scale-105 duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/480x380/eaf7f0/16341f?text=Height+Veda+Natural+Growth+Pack";
              }}
            />
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200/80 shadow-xs text-xs sm:text-sm font-semibold text-gray-800">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Pure Herbs</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200/80 shadow-xs text-xs sm:text-sm font-semibold text-gray-800">
            <Heart className="w-4 h-4 text-emerald-600" />
            <span>No Side Effects</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200/80 shadow-xs text-xs sm:text-sm font-semibold text-gray-800">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Award Winning</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200/80 shadow-xs text-xs sm:text-sm font-semibold text-gray-800">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Free Delivery</span>
          </div>
        </div>
      </div>
    </section>
  );
}
