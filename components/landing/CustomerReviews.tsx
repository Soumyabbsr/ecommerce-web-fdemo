"use client";

import React, { useState, useEffect } from "react";
import { Star, CheckCircle, ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight } from "lucide-react";

const REELS = [
  "https://heightveda.com/wp-content/uploads/2026/09/Reel-2.webp",
  "https://heightveda.com/wp-content/uploads/2026/09/Reel-3.webp",
  "https://heightveda.com/wp-content/uploads/2026/09/Reel-1.webp",
  "https://heightveda.com/wp-content/uploads/2026/09/Reel-4.webp",
  "https://heightveda.com/wp-content/uploads/2026/09/Reel-6.webp",
  "https://heightveda.com/wp-content/uploads/2026/09/Reel-7.webp",
  "https://heightveda.com/wp-content/uploads/2026/09/Reel-8.webp",
  "https://heightveda.com/wp-content/uploads/2026/09/Reel-9.webp",
  "https://heightveda.com/wp-content/uploads/2026/09/Reel-10.webp",
  "https://heightveda.com/wp-content/uploads/2026/09/Reel-11.webp",
  "https://heightveda.com/wp-content/uploads/2026/09/Reel-5.webp",
];

const HINDI_BENEFITS = [
  "शरीर के विकास में मदद करता है।",
  "कैल्शियम और जरूरी मिनरल्स को आसानी से शरीर में घुलने में मदद करता है।",
  "पोषक तत्वों को शरीर में बेहतर तरीके से पहुंचाने में मदद करता है।",
  "मांसपेशियों और अन्य हिस्सों को बढ़ने में मदद करता है।",
  "शरीर के हिस्सों को जल्दी ठीक करने और पुनर्जीवित करने की क्षमता बढ़ाता है।",
  "शरीर के विकास के लिए पिट्यूटरी ग्लैंड को एक्टिव करता है।",
  "ऊर्जा, संतुलन और ताकत को बढ़ाता है।",
  "पाचन सुधारकर शरीर की अतिरिक्त चर्बी कम करने में मदद करता है।",
];

const REVIEW_PHOTOS = [
  "https://heightveda.com/wp-content/uploads/2026/09/hv-review-10-scaled-1-150x150.webp",
  "https://heightveda.com/wp-content/uploads/2026/09/hv-review-11-scaled-1-150x150.webp",
  "https://heightveda.com/wp-content/uploads/2026/09/hv-review-12-scaled-1-150x150.webp",
  "https://heightveda.com/wp-content/uploads/2026/09/hv-review-13-scaled-1-150x150.webp",
];

export function CustomerReviews() {
  const [likes1, setLikes1] = useState(50);
  const [dislikes1, setDislikes1] = useState(0);
  const [likes2, setLikes2] = useState(28);
  const [dislikes2, setDislikes2] = useState(0);

  const [reelIndex, setReelIndex] = useState(0);

  useEffect(() => {
    const savedL1 = localStorage.getItem("hv_likes_1");
    const savedL2 = localStorage.getItem("hv_likes_2");
    if (savedL1) setLikes1(parseInt(savedL1));
    if (savedL2) setLikes2(parseInt(savedL2));
  }, []);

  const handleLike1 = () => {
    const next = likes1 + 1;
    setLikes1(next);
    localStorage.setItem("hv_likes_1", String(next));
  };

  const handleLike2 = () => {
    const next = likes2 + 1;
    setLikes2(next);
    localStorage.setItem("hv_likes_2", String(next));
  };

  const nextReel = () => {
    setReelIndex((prev) => Math.min(REELS.length - 4, prev + 1));
  };

  const prevReel = () => {
    setReelIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <section className="py-16 md:py-24 bg-white" id="reviews-sec">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Customer Review Headline */}
        <div className="text-center mb-10">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
            Real Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3 tracking-tight">
            Customer Reviews
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mt-2">
            Watch real customer video reels and read reviews from people who achieved their desired growth.
          </p>
        </div>

        {/* Video Reels Grid / Slider */}
        <div className="relative mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {REELS.slice(reelIndex, reelIndex + 4).map((reel, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-md bg-gray-100 aspect-square border border-gray-200 hover:shadow-xl transition"
              >
                <img
                  src={reel}
                  alt={`Customer Reel ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/400x400/16341f/ffffff?text=Reel";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    <span>▶</span> Verified Review
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevReel}
              disabled={reelIndex === 0}
              className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-800 hover:bg-emerald-50 disabled:opacity-30 transition"
              aria-label="Previous reels"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-gray-500">
              Showing {reelIndex + 1} - {Math.min(reelIndex + 4, REELS.length)} of {REELS.length}
            </span>
            <button
              onClick={nextReel}
              disabled={reelIndex >= REELS.length - 4}
              className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-800 hover:bg-emerald-50 disabled:opacity-30 transition"
              aria-label="Next reels"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Benefits of Height Veda (Hindi Checklist) */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-10 bg-[#fbf9f4] border border-emerald-900/10 shadow-sm mb-16">
          <h3 className="text-2xl sm:text-3xl font-black text-[#16341f] text-center mb-8">
            Benefits of Height Veda
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HINDI_BENEFITS.map((b, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-gray-100 shadow-2xs"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                </div>
                <span className="text-sm font-semibold text-gray-800 leading-snug">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Breakdown & Verified Reviews */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-black text-gray-900">What Customers Said</h3>
            <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
              <div className="flex gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="font-black text-gray-900 text-lg">4.9 / 5.0</span>
              <span className="text-xs text-gray-500 font-semibold">(10,000+ Reviews)</span>
            </div>
          </div>

          {/* Review Card 1 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-md mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-black text-gray-800 ml-1.5">Rating (4.9)</span>
              </div>
              <span className="text-xs font-semibold text-gray-400">19 August 2025</span>
            </div>

            <p className="text-base text-gray-800 font-medium leading-relaxed mb-4">
              &ldquo;Maine Height Veda ko 45 din tak lagataar use kiya, meri height 2 inch badh gayi. Yeh ek 100% safe aur Ayurvedic product hai.&rdquo;
            </p>

            {/* Review Photos Carousel */}
            <div className="grid grid-cols-4 gap-3 my-4">
              {REVIEW_PHOTOS.map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-gray-200 aspect-square">
                  <img
                    src={src}
                    alt={`Review proof ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/150x150/eaf7f0/16341f?text=Review";
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <h4 className="text-sm font-extrabold text-gray-900">Neha Joshi</h4>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified Buyer
                </span>
              </div>

              {/* Likes & Dislikes Counter */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike1}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-emerald-700 transition"
                >
                  <ThumbsUp className="w-4 h-4 text-emerald-600" />
                  <span>{likes1}</span>
                </button>
                <button
                  onClick={() => setDislikes1(dislikes1 + 1)}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-red-600 transition"
                >
                  <ThumbsDown className="w-4 h-4 text-gray-400" />
                  <span>{dislikes1}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Review Card 2 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-black text-gray-800 ml-1.5">Rating (4.5)</span>
              </div>
              <span className="text-xs font-semibold text-gray-400">12 September 2025</span>
            </div>

            <p className="text-base text-gray-800 font-medium leading-relaxed mb-4">
              &ldquo;2 mahine ke regular use ke baad mujhe height aur overall body mein visible difference dikha. Bilkul effective product hai.&rdquo;
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <h4 className="text-sm font-extrabold text-gray-900">Aman Verma</h4>
                <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified Buyer
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike2}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-emerald-700 transition"
                >
                  <ThumbsUp className="w-4 h-4 text-emerald-600" />
                  <span>{likes2}</span>
                </button>
                <button
                  onClick={() => setDislikes2(dislikes2 + 1)}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-red-600 transition"
                >
                  <ThumbsDown className="w-4 h-4 text-gray-400" />
                  <span>{dislikes2}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
