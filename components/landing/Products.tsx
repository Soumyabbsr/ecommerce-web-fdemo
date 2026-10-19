"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Eye, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";

interface ProductsSectionProps {
  initialProducts?: Product[];
}

export function ProductsSection({ initialProducts }: ProductsSectionProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>(initialProducts || []);

  useEffect(() => {
    if (!initialProducts || initialProducts.length === 0) {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.products) {
            setProducts(data.products);
          }
        })
        .catch((err) => console.error("Failed to load products:", err));
    }
  }, [initialProducts]);

  const handleBuyNow = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/checkout?productId=${productId}`);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#fcfbfa]" id="hvProducts">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Our Formulations</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2.5 tracking-tight">
            Choose Your <span className="text-gradient-green">Growth Plan</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto mt-1.5 font-normal">
            Select your preferred Ayurvedic transformation kit. Formulated for steady natural growth, posture, and bone density.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 items-stretch mb-8 sm:mb-10">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group"
              >
                {/* Badge if featured or popular */}
                {product.badge && (
                  <span className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide text-white bg-gradient-to-r from-emerald-600 to-green-700 shadow-sm">
                    {product.badge}
                  </span>
                )}

                <div>
                  {/* Product Image Frame */}
                  <div className="relative w-full h-44 sm:h-48 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#fbfaf8] via-white to-emerald-50/20 border border-gray-100 flex items-center justify-center p-3 mb-3.5 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105 drop-shadow-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/300x300/eaf7f0/16341f?text=Height+Veda";
                      }}
                    />
                    {/* Quick View Button Overlay */}
                    <Link
                      href={`/product/${product.slug || product.id}`}
                      className="absolute bottom-2 right-2 p-2 bg-white/95 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 rounded-full shadow-md border border-gray-200 transition opacity-0 group-hover:opacity-100"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="text-center space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug line-clamp-1 title-case">
                      {product.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-500 font-normal line-clamp-1 h-4">
                      {product.tagline || "Complete Ayurvedic Growth Formulation"}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-center justify-center gap-2 pt-1.5">
                      <span className="text-xl sm:text-2xl font-extrabold text-[#16341f]">
                        ₹{product.price.toLocaleString("en-IN")}/-
                      </span>
                      <del className="text-xs sm:text-sm font-normal text-gray-400">
                        ₹{product.original_price.toLocaleString("en-IN")}/-
                      </del>
                    </div>

                    <div className="text-[10px] sm:text-[11px] text-gray-400 font-normal">
                      MRP (incl. of all taxes)
                    </div>

                    <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] sm:text-[11px] font-semibold">
                      You Save ₹{product.save_amount.toLocaleString("en-IN")}/-
                    </div>
                  </div>
                </div>

                {/* Symmetrical CTA Buttons */}
                <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                  <Link
                    href={`/product/${product.slug || product.id}`}
                    className="py-2.5 sm:py-3 px-2 text-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition flex items-center justify-center whitespace-nowrap"
                  >
                    View Details
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => handleBuyNow(product.id, e)}
                    className="py-2.5 sm:py-3 px-2 text-center rounded-xl bg-[#16341f] hover:bg-[#0f2415] text-white font-bold text-xs shadow-sm hover:shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={2.2} />
                    <span>ORDER NOW</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safe Checkout Badge */}
        <div className="max-w-xs mx-auto text-center mt-2 mb-4">
          <img
            src="https://heightveda.com/wp-content/uploads/2026/09/safe-checkout-webp.webp"
            alt="100% Safe Checkout"
            className="w-full object-contain mx-auto"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>
      </div>
    </section>
  );
}
