"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  CheckCircle,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Quote,
  ThumbsUp,
  Award
} from "lucide-react";

interface Review {
  id: string;
  name: string;
  age: number;
  location: string;
  product: string;
  rating: number;
  date: string;
  headline: string;
  comment: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Rohan Verma",
    age: 34,
    location: "Bangalore",
    product: "Josh 1000 Capsule",
    rating: 5,
    date: "18 October 2026",
    headline: "Remarkable surge in daily stamina & energy!",
    comment:
      "I was struggling with chronic lethargy and low stamina after long office hours. After taking Josh 1000 capsules twice daily for 40 days, my physical vigor and endurance have doubled. Zero headache or palpitations like chemical supplements. Truly pure Ayurveda!",
    verified: true,
  },
  {
    id: "rev-2",
    name: "Manoj Agarwal",
    age: 52,
    location: "Jaipur",
    product: "Stop Sugar Anti-Diabetic Powder",
    rating: 5,
    date: "12 October 2026",
    headline: "Fasting sugar dropped from 220 to 118 mg/dL!",
    comment:
      "Stop Sugar (मधुमेह विनाशक चूर्ण) has been a blessing. My fasting sugar was stubbornly around 220. With 2 scoops daily before meals, my reading normalized to 118 mg/dL. The burning sensation and tingling in my soles have vanished. Highly recommended!",
    verified: true,
  },
  {
    id: "rev-3",
    name: "Sandeep Malhotra",
    age: 38,
    location: "New Delhi",
    product: "Time Master Performance Combo",
    rating: 5,
    date: "05 October 2026",
    headline: "The oil & capsule dual therapy is unbeatable",
    comment:
      "The combination of 80ml herbal massage oil and 60 capsules works on another level. The oil provides immediate localized blood warmth and stimulation, while the capsules build deep stamina from within. Excellent packaging and fast COD delivery.",
    verified: true,
  },
  {
    id: "rev-4",
    name: "Dr. S. K. Mehta",
    age: 48,
    location: "Mumbai",
    product: "Diasure Herb Powder",
    rating: 5,
    date: "28 September 2026",
    headline: "HbA1c lowered from 8.6 to 6.9 in 90 days",
    comment:
      "As a practicing doctor, I evaluated Diasure's 15 botanical ingredients. The standardized Karela, Jamun, Vijaysar, and Neem work synergistically on insulin resistance. My HbA1c is now well under 7.0 and I feel energetic throughout the day.",
    verified: true,
  },
];

const HINDI_BENEFITS = [
  "100% शुद्ध आयुर्वेदिक जड़ी-बूटियों का शास्त्रीय रस रसायन मिश्रण",
  "पुरुषों के शारीरिक स्टैमिना, ऊर्जा और आत्मविश्वास में तीव्र सुधार",
  "गुड़मार और जामुन से आंतों में चीनी का अवशोषण कम और इंसुलिन में सुधार",
  "पैंक्रियाज की बीटा-कोशिकाओं को पुनर्जीवित कर फास्टिंग शुगर नियंत्रित",
  "हाथ-पैरों में जलन, झुनझुनी और बार-बार पेशाब आने की समस्या से राहत",
  "आयुष मंत्रालय द्वारा प्रमाणित, बिना किसी स्टेरॉइड या साइड इफेक्ट के सुरक्षित",
];

export function CustomerReviews() {
  const [activeTab, setActiveTab] = useState<"all" | "vitality" | "sugar">("all");

  const filtered = REVIEWS.filter((r) => {
    if (activeTab === "all") return true;
    if (activeTab === "vitality") return r.product.includes("Josh") || r.product.includes("Time");
    if (activeTab === "sugar") return r.product.includes("Sugar") || r.product.includes("Diasure");
    return true;
  });

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#faf9f5] border-b border-gray-100" id="reviews-sec">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100/80 border border-emerald-300">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Verified Customer Stories</span>
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            Loved By Over <span className="text-gradient-green">50,000+ Indians</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mt-2 font-medium">
            Read real experiences from verified customers who transformed their health with Leafora Herbal.
          </p>

          {/* Rating Badge */}
          <div className="inline-flex items-center gap-3 mt-6 px-5 py-2.5 rounded-full bg-white border border-gray-200 shadow-xs">
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-black text-gray-900">4.9 / 5.0 Overall Rating</span>
            <span className="text-xs text-gray-400 font-semibold border-l pl-3 border-gray-200">
              (50,000+ Orders Shipped)
            </span>
          </div>
        </div>

        {/* Hindi Benefits Checklist Box */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-9 bg-white border border-emerald-900/10 shadow-sm mb-14">
          <h3 className="text-xl sm:text-2xl font-black text-[#0c2415] text-center mb-6">
            Leafora Herbal के मुख्य स्वास्थ्य लाभ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {HINDI_BENEFITS.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#faf9f5] border border-emerald-900/10"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-800 leading-snug">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="rounded-3xl p-6 sm:p-7 bg-white border border-gray-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-semibold">{rev.date}</span>
                </div>

                <div className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-black text-[11px] mb-2.5">
                  Verified Buyer: {rev.product}
                </div>

                <h4 className="text-base font-black text-gray-900 mb-2 leading-snug">
                  &ldquo;{rev.headline}&rdquo;
                </h4>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-black text-gray-900">
                    {rev.name}, {rev.age}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {rev.location}, India
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Purchase</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
