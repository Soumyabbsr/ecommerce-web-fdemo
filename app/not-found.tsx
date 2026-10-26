import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#fdfbf7]">
      <h1 className="text-4xl font-black text-gray-900 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">Sorry, we could not find the page you are looking for.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-emerald-800 text-white font-bold hover:bg-emerald-900 transition"
      >
        Return to Home
      </Link>
    </div>
  );
}
