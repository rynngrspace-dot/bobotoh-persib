"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand */}
          <Link href="/" className="flex flex-col group">
            <span
              className="text-2xl font-bold tracking-wider text-white leading-none group-hover:text-persib-blue transition-colors duration-300 uppercase"
              style={{ fontFamily: "var(--font-anton), Anton, sans-serif" }}
            >
              CHANT <span className="text-persib-blue">PERSIB</span>
            </span>
            <span className="text-[9px] tracking-[0.4em] text-slate-500 uppercase mt-1">
              1933 STILL ALIVE!
            </span>
          </Link>

          {/* Right Section - Tagline */}
          <div className="hidden sm:flex items-center text-right">
            <span
              className="text-[10px] font-bold tracking-widest text-slate-400 uppercase leading-none"
              style={{ fontFamily: "var(--font-anton), Anton, sans-serif" }}
            >
              We see things <span className="text-persib-blue mx-1">·</span> they'll never see
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}
