import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Chant Persib – Lirik Chant & Anthem Bobotoh",
    template: "%s | Chant Persib"
  },
  description:
    "Arsip digital lirik chant dan anthem Bobotoh Persib Bandung. Suarakan kebanggaanmu bersama ribuan Bobotoh di stadion!",
  keywords: [
    "Persib Bandung", "Lirik Chant Persib", "Anthem Persib", "Bobotoh", "Viking Persib Club", 
    "Bomber Persib", "Chant Supporters", "Lirik Lagu Persib", "Maung Bandung"
  ],
  authors: [{ name: "Bobotoh Persib" }],
  creator: "Bobotoh Persib",
  publisher: "Persib Supporter Archive",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Chant Persib – Lirik Chant & Anthem Bobotoh",
    description: "Arsip digital terlengkap lirik chant dan anthem Bobotoh Persib Bandung.",
    url: "https://chantpersib.com", // Placeholder
    siteName: "Chant Persib",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chant Persib – Lirik Chant & Anthem Bobotoh",
    description: "Arsip digital terlengkap lirik chant dan anthem Bobotoh Persib Bandung.",
    creator: "@chantpersib",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${anton.variable} ${inter.variable} antialiased`}
    >
      <body
        className={`${anton.variable} ${inter.variable} antialiased selection:bg-[#0046ad] selection:text-white`}
      >
        <div className="grain-overlay" />
        <Navbar />
        <main className="pt-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
