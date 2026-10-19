"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, ShieldCheck, PhoneCall, Leaf, Truck, CreditCard } from "lucide-react";

export function Header({ onOpenCheckout }: { onOpenCheckout?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full z-40 bg-white">
      {/* Top Announcement Ticker */}
      <div className="w-full bg-[#16341f] text-white py-2 overflow-hidden border-b border-emerald-900/40 text-xs sm:text-sm font-medium tracking-wide">
        <div className="animate-ticker flex items-center space-x-12 whitespace-nowrap">
          <span className="flex items-center gap-2">
            <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 100% Ayurvedic
          </span>
          <span className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Free Delivery All Over India
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Ayush Certified & Safe
          </span>
          <span className="flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Flat ₹400 OFF on Prepaid Orders
          </span>
          {/* Duplicate set for infinite seamless loop */}
          <span className="flex items-center gap-2">
            <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 100% Ayurvedic
          </span>
          <span className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Free Delivery All Over India
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Ayush Certified & Safe
          </span>
          <span className="flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Flat ₹400 OFF on Prepaid Orders
          </span>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav className="sticky top-0 bg-white shadow-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-44 sm:h-14 sm:w-52">
              <img
                src="https://heightveda.com/wp-content/uploads/2026/09/logo.gif"
                alt="Height Veda"
                className="h-full w-full object-contain"
                onError={(e) => {
                  // Fallback if gif doesn't render
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <span className="font-extrabold text-2xl tracking-tight text-[#16341f] sr-only">
                Height Veda
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <Link href="/#hvProducts" className="hover:text-emerald-700 transition">
              Products
            </Link>
            <Link href="/#about-sec" className="hover:text-emerald-700 transition">
              About
            </Link>
            <Link href="/#ingredients" className="hover:text-emerald-700 transition">
              15 Super Herbs
            </Link>
            <Link href="/#how-it-works" className="hover:text-emerald-700 transition">
              How To Use
            </Link>
            <Link href="/#expertview" className="hover:text-emerald-700 transition">
              Experts View
            </Link>
            <Link href="/#reviews-sec" className="hover:text-emerald-700 transition">
              Reviews
            </Link>
            <Link href="/#faqs-sec" className="hover:text-emerald-700 transition">
              FAQs
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenCheckout}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16341f] hover:bg-[#0f2415] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span>BUY NOW</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3">
            <Link
              href="/#hvProducts"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-emerald-700 border-b border-gray-100"
            >
              Our Products
            </Link>
            <Link
              href="/#about-sec"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-emerald-700 border-b border-gray-100"
            >
              About Height Veda
            </Link>
            <Link
              href="/#ingredients"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-emerald-700 border-b border-gray-100"
            >
              15 Super Herbs
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-emerald-700 border-b border-gray-100"
            >
              How To Use
            </Link>
            <Link
              href="/#expertview"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-emerald-700 border-b border-gray-100"
            >
              Experts View
            </Link>
            <Link
              href="/#reviews-sec"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-emerald-700 border-b border-gray-100"
            >
              Customer Reviews
            </Link>
            <Link
              href="/#faqs-sec"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-semibold text-gray-800 hover:text-emerald-700 border-b border-gray-100"
            >
              FAQs
            </Link>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCheckout?.();
                }}
                className="w-full py-3 bg-[#16341f] text-white font-bold rounded-xl text-center shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5 text-emerald-400" />
                <span>BUY NOW</span>
              </button>
              <a
                href="tel:07313626447"
                className="w-full py-2.5 bg-emerald-50 text-emerald-800 font-bold rounded-xl text-center flex items-center justify-center gap-2 border border-emerald-200"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Helpline (07313626447)</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
