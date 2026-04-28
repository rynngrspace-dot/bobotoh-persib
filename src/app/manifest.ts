import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chant Persib – Lirik Chant & Anthem Bobotoh",
    short_name: "Chant Persib",
    description: "Arsip digital lirik chant dan anthem Bobotoh Persib Bandung.",
    start_url: "/",
    display: "standalone",
    background_color: "#020817",
    theme_color: "#0046ad",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
