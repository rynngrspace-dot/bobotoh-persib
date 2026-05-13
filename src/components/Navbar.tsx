"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";

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
            {/* Desktop Tagline */}
            <span className="hidden sm:block text-[9px] tracking-[0.4em] text-slate-500 uppercase mt-1">
              1933 STILL ALIVE!
            </span>
            {/* Mobile Tagline */}
            <span className="block sm:hidden text-[9px] tracking-[0.2em] text-slate-500 uppercase mt-1 font-bold">
              We see things <span className="text-persib-blue mx-0.5">·</span> they'll never see
            </span>
          </Link>

          {/* Right Section - Tagline (Desktop) & Icon (Mobile) */}
          <div className="flex items-center">
            {/* Mobile Chat Icon - Minimalist */}
            <Link 
              href="/suara-bobotoh" 
              className="sm:hidden flex items-center justify-center text-slate-400 hover:text-persib-blue transition-colors px-2"
              aria-label="Suara Bobotoh"
            >
              <MessageSquare className="w-4 h-4" />
            </Link>

            {/* Desktop Tagline */}
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
      </div>
    </header>
  );
}
