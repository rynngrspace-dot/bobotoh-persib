"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, MoveRight, Search, Users, Eye } from "lucide-react";
import { getAllChants } from "@/lib/chantData";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const chants = getAllChants();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewsMap, setViewsMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const { data, error } = await supabase
          .from("chant_views")
          .select("slug, views");
        
        if (error) throw error;
        if (data) {
          const map: Record<string, number> = {};
          data.forEach((row) => {
            map[row.slug] = Number(row.views);
          });
          setViewsMap(map);
        }
      } catch (err) {
        console.warn("Failed to fetch views from Supabase:", err);
      }
    };

    fetchViews();
  }, []);

  const sortedChants = useMemo(() => {
    return [...chants].sort((a, b) => {
      const viewsA = viewsMap[a.slug] || 0;
      const viewsB = viewsMap[b.slug] || 0;
      return viewsB - viewsA; // Descending
    });
  }, [chants, viewsMap]);

  const filteredChants = useMemo(() => {
    if (!searchQuery.trim()) return sortedChants;
    
    const query = searchQuery.toLowerCase();
    return sortedChants.filter((chant) => {
      const titleMatch = chant.title.toLowerCase().includes(query);
      const lyricsMatch = chant.lyrics.some((line) => 
        line.toLowerCase().includes(query)
      );
      return titleMatch || lyricsMatch;
    });
  }, [searchQuery, sortedChants]);

  return (
    <div className="flex flex-col bg-slate-950 min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Background layers */}
        <div className="absolute inset-0 bg-slate-950" />
        {/* Radial blue glow - restored for atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,70,173,0.35),transparent)]" />
        
        {/* Grid texture - restored for modern tech feel */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,70,173,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,70,173,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-950 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center py-20 pt-32 sm:pt-40">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-persib-blue/50 bg-persib-blue/10 text-blue-400 text-[10px] font-semibold uppercase tracking-widest mb-6">
            <Users className="w-3.5 h-3.5" />
            From Bobotoh, For Persib
          </div>

          {/* Main Heading */}
          <h1
            className="text-[50px] sm:text-7xl lg:text-9xl text-white leading-[1.1] sm:leading-none tracking-wider mb-6 flicker"
            style={{ fontFamily: "var(--font-anton), Anton, sans-serif" }}
          >
            PERSIB{" "}
            <span className="block text-persib-blue mt-2 flicker">SANG PENAKLUK!</span>
          </h1>

          <div className="flex items-center justify-center gap-2 mb-8 fade-in-up [animation-delay:200ms]">
            <span className="text-gold text-2xl tracking-widest leading-none">★★★★</span>
            <div className="flex items-center gap-2 text-slate-600 opacity-50">
              <MoveRight className="w-4 h-4" />
              <span className="text-xl leading-none">★</span>
              <span className="text-[10px] font-bold uppercase tracking-widest leading-none">soon!</span>
            </div>
          </div>

          <p className="mt-8 text-sm sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed fade-in-up [animation-delay:400ms]">
            {/* Lebih dari sekadar dukungan, ini adalah warisan dan harga diri. <br className="hidden sm:block" /> */}
            {/* Abadikan setiap janji setia untuk kejayaan Sang Maung Bandung. <br /> */}
            <span className="text-persib-blue font-semibold italic">As one, as Bobotoh. Our friendship till we die</span>
          </p>

          <div className="mt-10 flex justify-center fade-in-up [animation-delay:600ms]">
            <Link 
              href="/suara-bobotoh"
              className="group relative flex items-center gap-3 px-8 py-4 bg-persib-blue hover:bg-blue-600 text-white rounded-2xl transition-all duration-300 shadow-2xl shadow-persib-blue/20 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span className="text-[9px] md:text-xs font-bold uppercase tracking-widest">Berikan Harapan & Doa untuk Persib</span>
            </Link>
          </div>

          {/* Search Bar - Mobile Optimized */}
          <div className="mt-8 sm:mt-12 max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-linear-to-r from-persib-blue/30 to-blue-500/10 blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-slate-900 border border-slate-700 group-focus-within:border-persib-blue rounded-xl sm:rounded-2xl overflow-hidden transition-colors duration-300 shadow-xl">
                <div className="flex items-center flex-1 px-4 py-2 sm:py-3">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari judul chant atau lirik..."
                    className="flex-1 bg-transparent px-4 py-1 text-white placeholder-slate-500 text-sm sm:text-base outline-none tracking-wider font-bold"
                    aria-label="Cari chant"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHANT LIST ───────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 w-full py-24 pb-40">
        {/* Section Label */}
        <div className="flex items-center gap-6 mb-12">
          <h2
            className="text-[10px] font-bold tracking-[0.5em] text-persib-blue uppercase"
            style={{ fontFamily: "var(--font-anton), Anton, sans-serif" }}
          >
            {searchQuery ? `Hasil Pencarian (${filteredChants.length})` : "List Lirik"}
          </h2>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* Clean list */}
        <ul className="flex flex-col border-t border-slate-800">
          {filteredChants.length > 0 ? (
            filteredChants.map((chant, i) => (
              <li key={chant.slug}>
                <Link
                  href={`/chant/${chant.slug}`}
                  className="group flex items-center justify-between py-4 border-b border-slate-800 hover:bg-slate-900/50 transition-all duration-300 px-4"
                >
                  <div className="flex items-center gap-6 min-w-0">
                    <span className="shrink-0 text-[10px] text-slate-500 font-bold tracking-widest w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-lg sm:text-xl text-white group-hover:text-persib-blue transition-colors duration-200 truncate uppercase"
                      style={{ fontFamily: "var(--font-anton), Anton, sans-serif" }}
                    >
                      {chant.title}
                    </span>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="py-12 text-center list-none">
              <p className="text-slate-500 italic tracking-wider">Lirik tidak ditemukan...</p>
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
