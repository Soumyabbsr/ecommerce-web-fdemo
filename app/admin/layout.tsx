import React from "react";
import Link from "next/link";
import { Shield, ShoppingBag, ArrowLeft, Database } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";

export const metadata = {
  title: "Admin Panel | Leafora Herbal Private Limited",
  description: "Product and Order management dashboard for Leafora Herbal Private Limited",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isSupabaseActive = isSupabaseConfigured();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Admin Navigation Header */}
      <header className="bg-[#16341f] text-white sticky top-0 z-50 border-b border-emerald-950 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="h-9 w-28 bg-white rounded-lg p-1 flex items-center justify-center shadow-xs">
                <img
                  src="/logo.png"
                  alt="Leafora Herbal Private Limited"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-extrabold text-base tracking-tight hidden sm:inline">
                Leafora Herbal <span className="text-emerald-400 font-semibold text-xs">Admin</span>
              </span>
            </Link>

            {/* Supabase Status Pill */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 border border-emerald-800">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Database: </span>
              <strong className={isSupabaseActive ? "text-emerald-300" : "text-amber-300"}>
                {isSupabaseActive ? "Supabase Live" : "Local Persistent"}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
