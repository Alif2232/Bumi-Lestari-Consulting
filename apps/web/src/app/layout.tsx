// ============================================
// 📁 apps/web/src/app/layout.tsx
// ============================================
// Nama       : Root Layout (Optimized)
// Penjelasan : Gunakan next/font untuk loading font
//              yang LEBIH CEPAT dari CSS @import.
//              next/font otomatis:
//              - Preload font
//              - Self-host font (tidak perlu request ke Google)
//              - Hapus FOIT (Flash of Invisible Text)
//              - Subset karakter sesuai kebutuhan
// ============================================

import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";

// 👇 next/font: DM Serif Display untuk judul
//    - subsets: ["latin"] — hanya ambil karakter latin (lebih kecil)
//    - variable: "--font-serif" — bisa dipakai di CSS via var()
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
  display: "swap",
});

// 👇 next/font: DM Sans untuk body text
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bumi Lestari Consulting — Konsultan Pertanian Profesional",
    template: "%s | Bumi Lestari Consulting",
  },
  description: "Bumi Lestari Consulting — mitra strategis untuk petani, pemerintah daerah, dan investor.",
  keywords: ["konsultan pertanian", "Bumi Lestari", "pendampingan petani", "analisis lahan", "ketahanan pangan"],
  openGraph: {
    title: "Bumi Lestari Consulting",
    description: "Mitra strategis untuk pertanian Indonesia yang lebih maju, produktif, dan berkelanjutan.",
    url: "https://bumilestari.co.id",
    siteName: "Bumi Lestari Consulting",
    locale: "id_ID",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Bumi Lestari Consulting", description: "Mitra strategis untuk pertanian Indonesia." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
