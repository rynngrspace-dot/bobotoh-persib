"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";

interface ChantActionsProps {
  title: string;
  lyrics: string[];
}

export default function ChantActions({ title, lyrics }: ChantActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullText = `${title}\n\n${lyrics.join("\n")}\n\nSumber: ${window.location.href}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWAChant = () => {
    const url = window.location.href;
    const text = `Lirik Chant Persib: ${title}\n\nBaca selengkapnya di: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleGeneralShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: `Chant Persib: ${title}`,
      text: `Baca lirik lengkap chant ${title} Persib Bandung di sini!`,
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      handleCopy(); // Fallback to copy if share API is not available
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 mt-12 py-8 border-t border-[#1e293b]">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-full text-[10px] font-bold text-white uppercase tracking-widest transition-all active:scale-95"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-green-500" />
            Tersalin
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-blue-500" />
            Salin
          </>
        )}
      </button>

      <button
        onClick={handleGeneralShare}
        className="flex items-center gap-2 px-4 py-2 bg-[#0046ad]/20 hover:bg-[#0046ad]/30 border border-[#0046ad]/40 rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-widest transition-all active:scale-95"
      >
        <Share2 className="w-3.5 h-3.5" />
        Share Lirik
      </button>
    </div>
  );
}
