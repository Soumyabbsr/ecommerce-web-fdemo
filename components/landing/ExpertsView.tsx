"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, X, ChevronLeft, ChevronRight, Tag, ShoppingBag } from "lucide-react";

interface ExpertVideo {
  title: string;
  doctor: string;
  role: string;
  thumbnail: string;
  videoUrl: string;
}

const EXPERTS: ExpertVideo[] = [
  {
    title: "Ayurvedic Growth Mechanism Explained",
    doctor: "Dr. Sharma",
    role: "Senior Ayurvedic Practitioner",
    thumbnail: "https://heightveda.com/wp-content/uploads/2026/09/b1-1-1.webp",
    videoUrl: "https://github.com/HeightVeda/Expert-Video/raw/refs/heads/main/Height%20Veda%201.mp4",
  },
  {
    title: "Clinical Observations on Nutrient Assimilation",
    doctor: "Vedant V.",
    role: "Wellness Coach",
    thumbnail: "https://heightveda.com/wp-content/uploads/2026/09/Height-Veda_Website-Thumbnail_05_12-Sep-2025-1.webp",
    videoUrl: "https://heightveda.com/wp-content/uploads/2026/09/Vedant-Height-Veda-Square-1.mp4",
  },
  {
    title: "Natural Bone Density & Hormonal Support",
    doctor: "Dr. Verma",
    role: "Ayurvedic Physician",
    thumbnail: "https://heightveda.com/wp-content/uploads/2026/09/male-doctor-1.webp",
    videoUrl: "https://github.com/HeightVeda/Expert-Video/raw/refs/heads/main/Height%20Veda%203.mp4",
  },
  {
    title: "Patient Transformation & Routine Guide",
    doctor: "Nidhi Deolekar",
    role: "Holistic Health Advisor",
    thumbnail: "https://heightveda.com/wp-content/uploads/2026/09/Height-Veda_Website-Thumbnail2-1.webp",
    videoUrl: "https://heightveda.com/wp-content/uploads/2026/09/Nidhi-Deolekar-Reel-In-Square-Format1-1.mp4",
  },
  {
    title: "Safety, Dosage, and Results Analysis",
    doctor: "Nikita S.",
    role: "Ayurvedic Nutritionist",
    thumbnail: "https://heightveda.com/wp-content/uploads/2026/09/Height-Veda_Website-Thumbnail3-1.webp",
    videoUrl: "https://heightveda.com/wp-content/uploads/2026/09/Nikita-Normal-1.mp4",
  },
];

export function ExpertsView() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  const prev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const next = () => {
    setStartIndex((prev) => Math.min(EXPERTS.length - 3, prev + 1));
  };

  return (
    <section className="py-16 md:py-24 bg-[#f8faf8] border-b border-gray-100" id="expertview">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-100/80 px-4 py-1.5 rounded-full border border-emerald-300">
            Clinical Insights
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            Experts View
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mt-2">
            Watch verified Ayurvedic doctors and wellness experts explain the science behind Height Veda&apos;s natural formula.
          </p>
        </div>

        {/* Video Slider */}
        <div className="relative mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXPERTS.slice(startIndex, startIndex + 3).map((expert, idx) => (
              <div
                key={idx}
                onClick={() => setActiveVideo(expert.videoUrl)}
                className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl bg-black cursor-pointer transform hover:-translate-y-1 transition duration-300 aspect-square"
              >
                {/* Thumbnail */}
                <img
                  src={expert.thumbnail}
                  alt={expert.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/500x500/16341f/ffffff?text=Expert+Video";
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-emerald-500 text-gray-900 group-hover:text-white flex items-center justify-center shadow-xl transition-all duration-300 transform group-hover:scale-110">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </div>

                {/* Caption / Doctor Details */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-1">
                    {expert.doctor}
                  </h4>
                  <p className="text-xs text-emerald-300 font-medium">
                    {expert.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              disabled={startIndex === 0}
              className="p-3 rounded-full bg-white border border-gray-200 text-gray-800 hover:bg-emerald-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-xs transition"
              aria-label="Previous videos"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: EXPERTS.length - 2 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStartIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    startIndex === i ? "w-6 bg-emerald-700" : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={startIndex >= EXPERTS.length - 3}
              className="p-3 rounded-full bg-white border border-gray-200 text-gray-800 hover:bg-emerald-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-xs transition"
              aria-label="Next videos"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Prepaid Flat ₹400 OFF Banner & Buy CTA */}
        <div className="max-w-2xl mx-auto rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-800 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Tag className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-200">Limited Period Offer</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">Flat ₹400 OFF on Prepaid Orders</h3>
            </div>
          </div>

          <Link
            href="/checkout?productId=prod-1"
            className="w-full sm:w-auto px-7 py-3.5 bg-white text-[#16341f] hover:bg-emerald-50 font-black rounded-2xl shadow-lg transition flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-700" />
            <span>BUY NOW</span>
          </Link>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-black rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white bg-black/60 rounded-full transition"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full aspect-square max-h-[80vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </section>
  );
}
