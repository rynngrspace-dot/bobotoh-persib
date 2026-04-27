import Link from "next/link";
import { Search, Users } from "lucide-react";
import { getAllChants } from "@/lib/chantData";

export default function HomePage() {
  const chants = getAllChants();

  return (
    <div className="flex flex-col bg-[#020817] min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
        {/* Background layers */}
        <div className="absolute inset-0 bg-[#020817]" />
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020817] to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center py-20 pt-32 sm:pt-40">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#0046ad]/50 bg-[#0046ad]/10 text-[#60a5fa] text-[10px] font-semibold uppercase tracking-widest mb-6">
            <Users className="w-3.5 h-3.5" />
            Dari Bobotoh, Untuk Persib
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl sm:text-7xl lg:text-9xl text-white leading-[1.1] sm:leading-none tracking-wider mb-6 flicker"
            style={{ fontFamily: "var(--font-anton), Anton, sans-serif" }}
          >
            SUARAKAN{" "}
            <span className="block text-[#0046ad] mt-2 flicker">KEBANGGAAN!</span>
          </h1>

          <p className="mt-8 text-sm sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed fade-in-up [animation-delay:400ms]">
            Lebih dari sekadar dukungan, ini adalah nafas dan harga diri. <br className="hidden sm:block" />
            Abadikan setiap janji setia untuk kejayaan Sang Maung Bandung. <br />
            <span className="text-[#0046ad] font-bold">PERSIB TILL I DIE!</span>
          </p>

          {/* Search Bar - Mobile Optimized */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0046ad]/30 to-blue-500/10 blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-slate-900 border border-slate-700 group-focus-within:border-[#0046ad] rounded-xl sm:rounded-2xl overflow-hidden transition-colors duration-300 shadow-xl">
                <div className="flex items-center flex-1 px-4 py-3 sm:py-0">
                  <Search className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Cari judul chant atau lirik..."
                    className="flex-1 bg-transparent px-4 py-1 text-white placeholder-slate-500 text-sm sm:text-base outline-none tracking-wider font-bold"
                    aria-label="Cari chant"
                  />
                </div>
                <button className="m-1.5 sm:m-2 px-6 py-3 sm:py-2.5 bg-[#0046ad] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-lg sm:rounded-xl transition-colors duration-200 uppercase tracking-widest active:scale-95">
                  Cari
                </button>
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
            className="text-[10px] font-bold tracking-[0.5em] text-[#0046ad] uppercase"
            style={{ fontFamily: "var(--font-anton), Anton, sans-serif" }}
          >
            List Lirik
          </h2>
          <div className="flex-1 h-px bg-[#1e293b]" />
        </div>

        {/* Clean list */}
        <div className="flex flex-col border-t border-[#1e293b]">
          {chants.map((chant, i) => (
            <Link
              key={chant.slug}
              href={`/chant/${chant.slug}`}
              className="group flex items-center justify-between py-4 border-b border-[#1e293b] hover:bg-[#0a1024] transition-all duration-300 px-4"
            >
              <div className="flex items-center gap-6 min-w-0">
                <span className="flex-shrink-0 text-[10px] text-[#475569] font-bold tracking-widest w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-lg sm:text-xl text-white group-hover:text-[#0046ad] transition-colors duration-200 truncate uppercase"
                  style={{ fontFamily: "var(--font-anton), Anton, sans-serif" }}
                >
                  {chant.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
