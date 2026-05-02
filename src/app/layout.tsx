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
  metadataBase: new URL("https://chantpersib.vercel.app"),
  applicationName: "Chant Persib",
  title: {
    default: "Kumpulan Lirik Chant Bobotoh Persib Bandung",
    template: "%s | Chant Persib"
  },
  description:
    "Arsip digital terlengkap kumpulan lirik chant dan anthem Bobotoh Persib Bandung. Suarakan kebanggaanmu bersama ribuan Bobotoh di stadion!",
  keywords: [
    "Persib Bandung", "Lirik Chant Persib", "Anthem Persib", "Bobotoh", "Viking Persib Club", 
    "Bomber Persib", "Chant Supporters", "Lirik Lagu Persib", "Maung Bandung", "Kumpulan Chant Persib"
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
    title: "Kumpulan Lirik Chant Bobotoh Persib Bandung",
    description: "Arsip digital terlengkap kumpulan lirik chant dan anthem Bobotoh Persib Bandung.",
    url: "https://chantpersib.vercel.app",
    siteName: "Chant Persib",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumpulan Lirik Chant Bobotoh Persib Bandung",
    description: "Arsip digital terlengkap kumpulan lirik chant dan anthem Bobotoh Persib Bandung.",
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
  verification: {
    google: "5SPQlTe3GyIPZsj4yOKLHqto11DE_fVND0hg6edpHpo",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Chant Persib",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Chant Persib",
              "alternateName": ["Bobotoh Chant Archive", "Lirik Persib"],
              "url": "https://chantpersib.vercel.app"
            }),
          }}
        />
      </head>
      <body
        className={`${anton.variable} ${inter.variable} antialiased selection:bg-persib-blue selection:text-white`}
      >
        <div className="grain-overlay" />
        <Navbar />
        <main className="pt-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
