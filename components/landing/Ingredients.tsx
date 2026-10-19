"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  Sprout,
  Zap,
  SunMedium,
  TreePine,
  Shield,
  Flower2,
  Activity,
  Flame,
  Mountain,
  Sparkles,
  Brain,
  Compass,
  Heart,
  Dumbbell,
} from "lucide-react";

interface Herb {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  name: string;
  latin: string;
  desc: string;
  color: string;
  bgColor: string;
}

const HERBS: Herb[] = [
  {
    icon: Leaf,
    name: "Ashwagandha",
    latin: "Withania somnifera",
    desc: "Promotes deep restorative sleep and supports natural growth hormone secretion.",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50/90 border-emerald-200/90",
  },
  {
    icon: Sprout,
    name: "Shatavari",
    latin: "Asparagus racemosus",
    desc: "A classical rejuvenating root that supports bone tissue nourishment and physical vitality.",
    color: "text-green-700",
    bgColor: "bg-green-50/90 border-green-200/90",
  },
  {
    icon: Zap,
    name: "Safed Musli",
    latin: "Chlorophytum borivilianum",
    desc: "Enhances joint lubrication, muscular stamina, and healthy connective tissue growth.",
    color: "text-amber-700",
    bgColor: "bg-amber-50/90 border-amber-200/90",
  },
  {
    icon: SunMedium,
    name: "Amla (Vitamin C)",
    latin: "Phyllanthus emblica",
    desc: "Rich in natural Vitamin C and bioflavonoids, supporting collagen and calcium absorption.",
    color: "text-amber-600",
    bgColor: "bg-amber-50/90 border-amber-200/90",
  },
  {
    icon: TreePine,
    name: "Moringa Leaf",
    latin: "Moringa oleifera",
    desc: "Natural plant calcium matrix providing high-potency minerals to reinforce bone density.",
    color: "text-teal-700",
    bgColor: "bg-teal-50/90 border-teal-200/90",
  },
  {
    icon: Shield,
    name: "Hadjod",
    latin: "Cissus quadrangularis",
    desc: "Ancient osteoblast-activating herb utilized to accelerate bone mineralization and resilience.",
    color: "text-emerald-800",
    bgColor: "bg-emerald-50/90 border-emerald-200/90",
  },
  {
    icon: Flower2,
    name: "Tulsi (Holy Basil)",
    latin: "Ocimum sanctum",
    desc: "Calming botanical that enhances cellular oxygenation, metabolic detox, and immunity.",
    color: "text-green-800",
    bgColor: "bg-green-50/90 border-green-200/90",
  },
  {
    icon: Activity,
    name: "Vidarikand",
    latin: "Pueraria tuberosa",
    desc: "Deeply nutritive root supporting muscle tone expansion and steady physical endurance.",
    color: "text-purple-700",
    bgColor: "bg-purple-50/90 border-purple-200/90",
  },
  {
    icon: Flame,
    name: "Gokhru",
    latin: "Tribulus terrestris",
    desc: "Boosts physical strength, endurance, and healthy endocrine vitality.",
    color: "text-orange-700",
    bgColor: "bg-orange-50/90 border-orange-200/90",
  },
  {
    icon: Mountain,
    name: "Himalayan Shilajit",
    latin: "Purified Asphaltum",
    desc: "Fulvic mineral matrix that delivers 84+ essential trace minerals directly into cells.",
    color: "text-slate-700",
    bgColor: "bg-slate-100/90 border-slate-200/90",
  },
  {
    icon: Sparkles,
    name: "Kaunch Beej",
    latin: "Mucuna pruriens",
    desc: "Natural source of L-Dopa supporting the pituitary gland and healthy growth hormone release.",
    color: "text-amber-800",
    bgColor: "bg-amber-50/90 border-amber-200/90",
  },
  {
    icon: Brain,
    name: "Shankhpushpi",
    latin: "Convolvulus pluricaulis",
    desc: "Calms stress and promotes restful sleep during which natural growth processes occur.",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50/90 border-indigo-200/90",
  },
  {
    icon: Compass,
    name: "Pippali (Bio-Catalyst)",
    latin: "Piper longum",
    desc: "Traditional bioavailability booster ensuring complete and rapid absorption of all herbs.",
    color: "text-red-700",
    bgColor: "bg-red-50/90 border-red-200/90",
  },
  {
    icon: Heart,
    name: "Yashtimadhu",
    latin: "Glycyrrhiza glabra",
    desc: "Harmonizes digestion, supports gut integrity, and aids healthy cellular hydration.",
    color: "text-rose-700",
    bgColor: "bg-rose-50/90 border-rose-200/90",
  },
  {
    icon: Dumbbell,
    name: "Bala Root",
    latin: "Sida cordifolia",
    desc: "Fortifies spinal muscles, joints, and skeletal resilience across daily movement.",
    color: "text-emerald-800",
    bgColor: "bg-emerald-50/90 border-emerald-200/90",
  },
];

export function Ingredients() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group into pages of 3 on desktop, 2 on tablet, 1 on mobile
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, HERBS.length - itemsPerPage);

  const prev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#fbf9f4]" id="ingredients">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pure Botanical Science</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2.5 tracking-tight">
            15 Super Herbs &amp; Standardized Extracts
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mt-1.5 font-normal leading-relaxed">
            Every ingredient in Height Veda is ethically sourced, standardized, and balanced using classical Charaka Samhita Rasayana principles — 100% natural with zero chemicals.
          </p>
        </div>

        {/* Carousel Viewport */}
        <div className="relative">
          <div className="overflow-hidden py-2 -mx-2 px-2">
            <div
              className="flex transition-transform duration-500 ease-out gap-4 sm:gap-5"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              }}
            >
              {HERBS.map((herb, idx) => {
                const HerbIcon = herb.icon;
                return (
                  <div
                    key={idx}
                    className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] shrink-0 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md border border-gray-200/90 flex flex-col justify-between transition-all"
                  >
                    <div>
                      {/* Premium Vector Icon Badge */}
                      <div className={`w-11 h-11 rounded-2xl ${herb.bgColor} border flex items-center justify-center mb-3.5 shadow-2xs`}>
                        <HerbIcon className={`w-5 h-5 ${herb.color}`} strokeWidth={2} />
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                        {herb.name}
                      </h3>
                      <span className="block text-xs font-medium text-emerald-700 italic mt-0.5 mb-2.5">
                        {herb.latin}
                      </span>

                      <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                        {herb.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>Pure Standardized Extract</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 max-w-xs mx-auto">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-800 hover:bg-emerald-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs transition cursor-pointer"
              aria-label="Previous herbs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === i ? "w-6 bg-emerald-800" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-800 hover:bg-emerald-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xs transition cursor-pointer"
              aria-label="Next herbs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
