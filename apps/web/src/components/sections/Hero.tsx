// ============================================
// 📁 apps/web/src/components/sections/Hero.tsx
// ============================================
// Nama       : Hero Section
// Fungsi     : Bagian paling atas/utama halaman beranda.
//              Ini adalah first impression website.
// Penjelasan : Berisi headline besar, sub-headline,
//              dua tombol CTA, ilustrasi lingkaran hijau,
//              dan 3 kartu statistik yang mengambang.
//              Background menggunakan gradien krem ke sage
//              yang merepresentasikan lanskap pertanian
// ============================================

'use client';
// 👆 Client Component — karena ada animasi dan IntersectionObserver

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// 👇 Data statistik hero — 3 angka utama yang muncul mengambang
const heroStats = [
  { number: "12.400+", label: "Hektar Lahan\nDikelola", position: "top-8 right-0" },
  { number: "8.200+", label: "Petani Binaan\nAktif", position: "bottom-1/4 left-0" },
  { number: "47", label: "Proyek Pemerintah\nSelesai", position: "bottom-5 right-[10%]" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  // 👇 useRef: untuk IntersectionObserver — animasi muncul saat scroll

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0");
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      // 👇 Background gradien: dari krem (atas) ke sage (bawah)
      //    Ini merepresentasikan lanskap pertanian dari fajar ke siang
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-brand-cream via-brand-cream-dark to-brand-sage-light pt-28 opacity-0 transition-opacity duration-1000"
    >
      {/* 👇 Background shapes — bukit abstrak dari lingkaran CSS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[800px] h-[500px] rounded-full bg-brand-primary/10 -bottom-20 -left-48 -rotate-6" />
        <div className="absolute w-[600px] h-[400px] rounded-full bg-brand-primary-light/10 -bottom-10 -right-36 rotate-12" />
        <div className="absolute w-[400px] h-[300px] rounded-full bg-brand-sage/15 bottom-14 left-2/4 -translate-x-1/2 -rotate-3" />
        {/* 👇 Elemen dekoratif mengambang (float animasi) */}
        <span className="absolute top-1/4 left-[8%] text-6xl opacity-5 animate-float">🌾</span>
        <span className="absolute top-3/5 right-[10%] text-5xl opacity-5 animate-float" style={{ animationDelay: "-7s" }}>🌿</span>
        <span className="absolute top-1/3 right-[18%] text-4xl opacity-5 animate-float" style={{ animationDelay: "-14s" }}>☀️</span>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* 👇 KOLOM KIRI: Teks */}
        <div>
          {/* 👇 Label kecil — dengan background emas transparan */}
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/10 rounded-full text-xs font-semibold text-brand-secondary uppercase tracking-widest mb-6">
            <span>📍</span> Konsultan Pertanian Terpercaya
          </span>

          {/* 👇 Headline utama */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-brand-dark mb-6">
            Menumbuhkan{" "}
            <span className="text-brand-primary relative">
              Ketahanan Pangan
              {/* 👇 Garis bawah dekoratif (highlight emas) */}
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-brand-secondary-light/50 -z-10" />
            </span>{" "}
            Indonesia
          </h1>

          {/* 👇 Deskripsi */}
          <p className="text-base md:text-lg text-[#6B6B6B] leading-relaxed max-w-xl mb-10">
            Bumi Lestari Consulting adalah mitra strategis untuk petani,
            pemerintah daerah, dan investor — menghadirkan solusi pertanian
            berbasis data, pendampingan lapangan, dan analisis lahan
            yang terukur dan berkelanjutan.
          </p>

          {/* 👇 Tombol CTA */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="#layanan"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-primary text-white font-semibold rounded-lg hover:bg-[#2D5A3F] hover:shadow-lg hover:shadow-brand-primary/30 transition-all duration-300"
            >
              📋 Lihat Layanan
            </Link>
            <Link
              href="#kontak"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-brand-primary font-semibold rounded-lg border-2 border-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300"
            >
              💬 Konsultasi Gratis
            </Link>
          </div>
        </div>

        {/* 👇 KOLOM KANAN: Ilustrasi & Statistik */}
        <div className="relative flex items-center justify-center min-h-[400px]">
          {/* 👇 Lingkaran hijau besar — ilutrasi utama */}
          <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px] rounded-full bg-gradient-to-br from-brand-primary-lighter to-brand-primary flex items-center justify-center text-7xl md:text-8xl overflow-hidden">
            <span className="opacity-60 select-none">🌾</span>
            {/* 👇 Border dashed berputar (animasi spin-slow) */}
            <div className="absolute inset-2 rounded-full border-2 border-white/10 border-dashed animate-spin-slow" />
          </div>

          {/* 👇 Kartu statistik mengambang */}
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "absolute bg-white rounded-2xl px-5 py-4 shadow-lg opacity-0 animate-fade-in-up",
                stat.position
              )}
              style={{ animationDelay: `${(i + 1) * 0.3}s` }}
            >
              <div className="font-serif text-2xl text-brand-primary">
                {stat.number}
              </div>
              <div className="text-xs text-[#6B6B6B] whitespace-pre-line">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
