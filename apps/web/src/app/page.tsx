// ============================================
// 📁 apps/web/src/app/page.tsx
// ============================================
// Nama       : Halaman Utama (Home Page)
// Fungsi     : Halaman utama website Bumi Lestari Consulting.
//              Menggabungkan semua komponen section.
// Penjelasan : File ini adalah halaman "/" (root) dari website.
//              Setiap komponen section diimpor dan disusun
//              berurutan dari atas ke bawah. Ini adalah
//              Server Component (tanpa 'use client') karena
//              hanya menggabungkan komponen tanpa interaktivitas
//              langsung. Setiap section yang butuh client-side
//              sudah punya 'use client' masing-masing
// ============================================

import Hero from "@/components/sections/Hero";
import StatsBanner from "@/components/sections/StatsBanner";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Testimonials from "@/components/sections/Testimonials";
import InvestorCTA from "@/components/sections/InvestorCTA";

export default function HomePage() {
  return (
    <>
      {/* 👇 Hero Section — first impression, yang pertama dilihat user */}
      <Hero />

      {/* 👇 Stats Banner — bukti kredibilitas dalam angka, transisi dari hero */}
      <StatsBanner />

      {/* 👇 Services — 6 layanan unggulan dalam grid kartu */}
      <Services />

      {/* 👇 Projects — portofolio proyek nyata, membangun kepercayaan */}
      <Projects />

      {/* 👇 Testimonials — social proof dari petani & pemerintah */}
      <Testimonials />

      {/* 👇 Investor CTA — khusus untuk menarik investor & mitra */}
      <InvestorCTA />

      {/* 👇 Catatan: Navbar, Footer, WhatsApp float sudah ada di layout.tsx,
           jadi tidak perlu dipasang lagi di sini */}
    </>
  );
}
