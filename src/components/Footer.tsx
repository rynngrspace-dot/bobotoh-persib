import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          
          {/* Left: Tagline only */}
          <div className="flex items-center">
            <p className="text-[8px] md:text-[9px] tracking-[0.3em] text-[#475569] uppercase font-bold">
              Born as a Blue · Live for the Blue · Die as a Blue
            </p>
          </div>

          {/* Right: Copyright */}
          <div className="flex items-center gap-4">
            <span className="text-[9px] tracking-[0.2em] text-[#334155] uppercase">
              &copy; {new Date().getFullYear()} ARCHIVE
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}
