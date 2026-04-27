"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#1e293b] bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand */}
          <Link href="/" className="flex flex-col group">
            <span
              className="text-2xl font-bold tracking-[0.1em] text-white leading-none group-hover:text-[#0046ad] transition-colors duration-300 uppercase"
              style={{ fontFamily: "var(--font-anton), Anton, sans-serif" }}
            >
              CHANT <span className="text-[#0046ad]">PERSIB</span>
            </span>
            <span className="text-[9px] tracking-[0.4em] text-[#64748b] uppercase mt-1">
              Bobotoh Culture
            </span>
          </Link>

          {/* Right Section - Tagline */}
          <div className="hidden sm:flex items-center text-right">
            <span
              className="text-[10px] font-bold tracking-[0.3em] text-[#94a3b8] uppercase leading-none"
              style={{ fontFamily: "var(--font-anton), Anton, sans-serif" }}
            >
              We see things <span className="text-[#0046ad] mx-1">·</span> they'll never see
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}
