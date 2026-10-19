"use client";

import React from "react";
import Link from "next/link";
import { Check, MessageCircle, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#16341f] text-white pt-16 pb-10 border-t border-emerald-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-48 bg-white/95 p-2 rounded-xl">
                <img
                  src="https://heightveda.com/wp-content/uploads/2026/09/logo.gif"
                  alt="Height Veda"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            </Link>
            <p className="text-sm text-emerald-200/90 leading-relaxed font-medium">
              Natural Height Growth &amp; Wellness Suite. Time-tested Ayurvedic herbal formulations designed for natural body nourishment.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Ayush Certified &amp; GMP Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-extrabold text-white mb-4 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-200/80 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="#about-sec" className="hover:text-white transition flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="#hvProducts" className="hover:text-white transition flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Products</span>
                </Link>
              </li>
              <li>
                <Link href="#expertview" className="hover:text-white transition flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Experts View</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-base font-extrabold text-white mb-4 tracking-wide">
              Legal &amp; Policies
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-200/80 font-medium">
              <li>
                <Link href="/legal/privacy-policy" className="hover:text-white transition flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/legal/shipping-policy" className="hover:text-white transition flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Shipping Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-white transition flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Terms &amp; Conditions</span>
                </Link>
              </li>
              <li>
                <Link href="/legal/refunds" className="hover:text-white transition flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Refund &amp; Returns</span>
                </Link>
              </li>
              <li>
                <Link href="/legal/disclaimer" className="hover:text-white transition flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Disclaimer</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us / Social & Contact */}
          <div>
            <h4 className="text-base font-extrabold text-white mb-4 tracking-wide">
              Connect With Us
            </h4>
            <p className="text-xs text-emerald-200/80 mb-4">
              Need assistance or order support? Our customer care specialists are available Monday to Saturday.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a
                href="https://www.instagram.com/heightveda/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-emerald-600 text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/9039014669"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-emerald-600 text-white flex items-center justify-center transition"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@HeightVeda/featured"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-emerald-600 text-white flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-800/80 text-xs">
              <span className="block text-emerald-300 font-bold">Helpline Support</span>
              <a href="tel:07313626447" className="text-white font-extrabold text-sm hover:underline">
                0731-3626447
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-emerald-900/70 text-center text-xs text-emerald-300/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© All Copyright {currentYear} Height Veda. Powered by <strong>Herbal Deck</strong></p>
          <p className="text-[11px] text-emerald-400/60">
            Results may vary from person to person. Authentic product only on heightveda.com
          </p>
        </div>
      </div>
    </footer>
  );
}
