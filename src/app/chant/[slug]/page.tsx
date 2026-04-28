import Link from "next/link";
import type { Metadata } from "next";
import { Play, ChevronLeft } from "lucide-react";
import { chantDatabase, defaultChant } from "@/lib/chantData";
import ChantActions from "@/components/ChantActions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chant = chantDatabase[slug] ?? defaultChant;
  
  const pageTitle = `Lirik Chant ${chant.title}`;
  const pageDesc = `Baca lirik lengkap chant ${chant.title} Persib Bandung. Suarakan kebanggaanmu bersama Bobotoh di stadion!`;

  return {
    title: chant.title,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      type: "article",
      publishedTime: "2024-01-01T00:00:00.000Z", // Placeholder
      authors: ["Bobotoh Culture"],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
    },
  };
}

export default async function ChantDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chant = chantDatabase[slug] ?? {
    ...defaultChant,
    title: slug.replace(/-/g, " ").toUpperCase(),
  };

  return (
    <div className="min-h-screen bg-[#020817] flex flex-col pt-24 sm:pt-32 pb-32 px-6 relative overflow-hidden">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicComposition",
            "name": chant.title,
            "description": `Lirik chant Persib Bandung: ${chant.title}`,
            "author": {
              "@type": "Person",
              "name": chant.author || "Bobotoh"
            },
            "lyrics": {
              "@type": "Lyrics",
              "text": chant.lyrics.join("\n")
            }
          }),
        }}
      />
      
      {/* Stadium Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,70,173,0.1),transparent_70%)] animate-pulse" />
      
      <div className="max-w-2xl mx-auto w-full relative z-10">
        {/* Back Button - User Friendly for Mobile */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-[0.3em] mb-12 py-2 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Kembali
        </Link>

        {/* Title Section */}
        <div className="mb-16">
          <h1
            className="text-4xl sm:text-6xl text-white font-bold leading-tight uppercase tracking-tight mb-4 flicker"
            style={{ fontFamily: "var(--font-anton), Anton, sans-serif" }}
          >
            {chant.title}
          </h1>
          {chant.author && (
            <p className="text-[10px] font-bold text-blue-500/80 uppercase tracking-[0.4em] mb-6">
              By {chant.author}
            </p>
          )}
          <div className="w-12 h-1 bg-[#0046ad]" />
        </div>

        {/* Lyrics Section */}
        <article className="relative">
          <div className="absolute left-0 top-0 w-[1px] h-full bg-[#1e293b]" />
          <div className="pl-8 space-y-4">
            {chant.lyrics.map((line, i) => {
              if (line === "") return <div key={i} className="h-6" />;
              if (line.startsWith("🔷")) {
                return (
                  <p
                    key={i}
                    className="text-[#0046ad] text-xs font-bold uppercase tracking-[0.4em] pt-2"
                    style={{ fontFamily: "var(--font-anton), Anton, sans-serif" }}
                  >
                    {line.replace("Reff:", "")}
                  </p>
                );
              }
              return (
                <p
                  key={i}
                  className="text-base sm:text-lg text-white font-medium leading-relaxed tracking-tight"
                >
                  {line}
                </p>
              );
            })}
          </div>
        </article>
        
        <ChantActions title={chant.title} lyrics={chant.lyrics} />

      </div>
    </div>
  );
}
