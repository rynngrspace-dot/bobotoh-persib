"use client";

import { useEffect, useState } from "react";
import { Eye, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ChantViewCounterProps {
  slug: string;
}

// Module-level cache to prevent double-counting due to React Strict Mode in development
// and to avoid inflating counts when a user navigates back and forth during the same session.
const incrementedSlugs = new Set<string>();

export default function ChantViewCounter({ slug }: ChantViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const alreadyIncremented = incrementedSlugs.has(slug);
    if (!alreadyIncremented) {
      incrementedSlugs.add(slug);
    }

    const incrementAndFetchViews = async () => {
      try {
        let data: any;
        let rpcError: any;

        if (!alreadyIncremented) {
          // Trigger atomic increment RPC function in Supabase
          const res = await supabase.rpc("increment_chant_views", {
            chant_slug: slug,
          });
          data = res.data;
          rpcError = res.error;
        } else {
          // Just fetch the count without incrementing again in the same session
          const res = await supabase
            .from("chant_views")
            .select("views")
            .eq("slug", slug)
            .single();
          data = res.data;
          rpcError = res.error;
        }

        if (rpcError) throw rpcError;

        if (isMounted && data) {
          // If return value is an object containing views
          if (typeof data === "object" && "views" in data) {
            setViews(Number(data.views));
          } else {
            setViews(Number(data));
          }
        }
      } catch (err) {
        // Graceful fallback to simple SELECT if RPC isn't set up yet
        try {
          const { data, error: selectError } = await supabase
            .from("chant_views")
            .select("views")
            .eq("slug", slug)
            .single();

          if (selectError) throw selectError;

          if (isMounted && data) {
            setViews(Number(data.views));
          }
        } catch (fallbackErr) {
          // Fail completely silently if tables aren't configured yet
          if (isMounted) setError(true);
        }
      }
    };

    incrementAndFetchViews();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (error || views === null) return null; // Gracefully hide while loading or if it fails

  return (
    <div className="inline-flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider select-none animate-fade-in">
      <Eye className="w-3.5 h-3.5 text-persib-blue/80 shrink-0" />
      <span className="tabular-nums">
        {views.toLocaleString("id-ID")} kali dilihat
      </span>
    </div>
  );
}
