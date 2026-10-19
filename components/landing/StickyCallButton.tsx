"use client";

import React from "react";
import { Phone } from "lucide-react";

export function StickyCallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="tel:07313626447"
      id="hvStickyCall"
      className={`fixed bottom-5 right-5 z-40 h-13 px-4 py-1.5 rounded-full shadow-2xl flex items-center gap-2.5 text-white font-black text-sm sm:text-base tracking-wide transition-all duration-300 transform hover:scale-105 active:scale-95 group ${className}`}
      style={{
        background: "linear-gradient(135deg, #34d399 0%, #16341f 100%)",
        boxShadow: "0 8px 25px rgba(22, 52, 31, 0.4)",
      }}
      title="Call Height Veda Helpline"
    >
      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-900 shadow-md group-hover:rotate-12 transition-transform">
        <Phone className="w-4 h-4 fill-current text-gray-900" />
      </div>
      <span className="font-extrabold pr-1.5 drop-shadow-xs">CALL NOW</span>
    </a>
  );
}
