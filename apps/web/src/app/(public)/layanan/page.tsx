// ============================================
// 📁 apps/web/src/app/(public)/layanan/page.tsx
// ============================================
// Nama       : Halaman Layanan
// Fungsi     : Menampilkan detail semua layanan Bumi Lestari
//              dalam format yang lebih lengkap dari homepage
// Penjelasan : Setiap layanan ditampilkan dalam kartu besar
//              dengan ikon, deskripsi panjang, dan tombol
//              action. Cocok untuk calon klien yang ingin
//              memahami detail layanan sebelum menghubungi
// ============================================

'use client';
import { useEffect } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";

export default function LayananPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===== HERO HALAMAN ===== */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-brand-cream to-brand-cream-dark">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-brand-secondary mb-4">
            Layanan Kami
          </span>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight text-brand-dark mb-5">
            Solusi Lengkap untuk<br />
            Pertanian Berkelanjutan
          </h1>
          <div className="w-16 h-0.5 bg-brand-secondary mx-auto mb-5" />
          <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
            Dari analisis tanah hingga pendampingan program pemerintah — kami hadir
            di setiap tahap untuk memastikan hasil yang optimal dan lestari.
          </p>
        </div>
      </section>

      {/* ===== DAFTAR LAYANAN ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 space-y-8">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              className="reveal grid md:grid-cols-5 gap-8 bg-brand-cream rounded-2xl p-8 md:p-10 border border-black/5 hover:shadow-md transition-all duration-300"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* 👇 Ikon — 1 kolom */}
              <div className="md:col-span-1 flex md:justify-center">
                <div className="w-20 h-20 rounded-2xl bg-brand-sage-light flex items-center justify-center text-5xl">
                  {service.icon}
                </div>
              </div>

              {/* 👇 Konten — 4 kolom */}
              <div className="md:col-span-4">
                <h2 className="font-serif text-2xl md:text-3xl text-brand-dark mb-3">
                  {service.title}
                </h2>
                <p className="text-base text-[#6B6B6B] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* 👇 Benefit list */}
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {[
                    "Didukung data dan riset ilmiah",
                    "Tenaga ahli berpengalaman",
                    "Pendekatan berkelanjutan",
                    "Laporan terukur & transparan",
                  ].map((benefit, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                      <span className="text-brand-secondary">✓</span>
                      {benefit}
                    </div>
                  ))}
                </div>

                <Link
                  href="/kontak"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-[#2D5A3F] transition-all duration-300"
                >
                  Konsultasi Sekarang →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-brand-dark text-white text-center">
        <div className="max-w-[1200px] mx-auto px-6 reveal">
          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4">
            Tidak Yakin Layanan Mana yang Tepat?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Tim kami siap membantu Anda menentukan solusi terbaik untuk
            kebutuhan pertanian Anda. Gratis!
          </p>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-accent text-white font-semibold rounded-lg hover:bg-[#A84A30] transition-all duration-300"
          >
            📞 Konsultasi Gratis →
          </Link>
        </div>
      </section>
    </>
  );
}
