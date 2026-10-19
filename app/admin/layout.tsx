import React from "react";
import Link from "next/link";
import { Shield, ShoppingBag, ArrowLeft, Database } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";

export const metadata = {
  title: "Admin Panel | Height Veda E-Commerce",
  description: "Product and Order management dashboard for Height Veda",
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
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight">
                Height Veda <span className="text-emerald-400 font-semibold text-sm">Admin</span>
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
