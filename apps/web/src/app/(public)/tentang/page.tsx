// ============================================
// 📁 apps/web/src/app/(public)/tentang/page.tsx
// ============================================
// Nama       : Halaman Tentang Kami
// Fungsi     : Menampilkan profil perusahaan, visi-misi,
//              tim ahli, dan penghargaan
// Penjelasan : Halaman ini memberikan informasi lengkap
//              tentang Bumi Lestari Consulting kepada calon
//              klien pemerintah, petani, dan investor.
//              Desain profesional dengan foto tim (placeholder)
// ============================================

'use client';
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function TentangPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
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
            Tentang Kami
          </span>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight text-brand-dark mb-5">
            Mitra Terpercaya untuk<br />
            Pertanian Indonesia
          </h1>
          <div className="w-16 h-0.5 bg-brand-secondary mx-auto mb-5" />
          <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
            Berdiri sejak 2018, Bumi Lestari Consulting telah menjadi mitra
            strategis bagi lebih dari 8.000 petani dan 47 proyek pemerintah
            di seluruh Indonesia.
          </p>
        </div>
      </section>

      {/* ===== VISI MISI ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-brand-secondary mb-4">
              Visi & Misi
            </span>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight text-brand-dark mb-6">
              Menuju Pertanian<br />
              Indonesia yang Berdaulat
            </h2>
            <p className="text-base text-[#6B6B6B] leading-relaxed mb-6">
              <strong className="text-brand-dark">Visi:</strong> Menjadi mitra
              konsultasi pertanian terdepan di Indonesia yang mendorong
              terciptanya ketahanan pangan nasional melalui pendekatan
              berkelanjutan dan berbasis teknologi.
            </p>
            <p className="text-base text-[#6B6B6B] leading-relaxed">
              <strong className="text-brand-dark">Misi:</strong>
            </p>
            <ul className="mt-3 space-y-3">
              {[
                "Memberikan solusi pertanian berbasis data dan riset ilmiah",
                "Mendampingi petani meningkatkan produktivitas secara berkelanjutan",
                "Menjembatani kemitraan strategis antara petani, pemerintah, dan investor",
                "Mendorong adopsi teknologi pertanian modern di tingkat petani",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#6B6B6B]">
                  <span className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-xs flex-shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-brand-sage-light to-brand-cream-dark flex items-center justify-center text-9xl">
              🌱
            </div>
            {/* 👇 Card statistik di pojok */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-5 py-4">
              <div className="font-serif text-2xl text-brand-primary">8.200+</div>
              <div className="text-xs text-[#6B6B6B]">Petani Binaan</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIM AHLI ===== */}
      <section className="py-16 md:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-brand-secondary mb-4">
              Tim Ahli
            </span>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight text-brand-dark mb-5">
              Para Ahli di Balik<br />
              Bumi Lestari
            </h2>
            <div className="w-16 h-0.5 bg-brand-secondary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Ir. Hadi Prasetyo, M.Sc.", role: "Founder & Chief Agronomist", emoji: "👨‍🔬", desc: "Pakar agronomi dengan 20+ tahun pengalaman di penelitian tanaman pangan" },
              { name: "Dr. Dewi Sartika, SP., M.P.", role: "Kepala Riset & Pengembangan", emoji: "👩‍🔬", desc: "Doktor ilmu pertanian, spesialis tanaman padi dan palawija" },
              { name: "Ir. Bambang Wijaya, M.M.", role: "Kepala Proyek & Operasional", emoji: "👷", desc: "Berpengalaman mengelola 30+ proyek pertanian pemerintah" },
            ].map((member, i) => (
              <div key={i} className="reveal bg-white rounded-2xl p-8 border border-black/5 text-center hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-20 h-20 rounded-full bg-brand-sage-light flex items-center justify-center text-4xl mx-auto mb-5">
                  {member.emoji}
                </div>
                <h3 className="font-serif text-xl text-brand-dark mb-1">{member.name}</h3>
                <p className="text-xs font-semibold text-brand-secondary uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MITRA KAMI ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-brand-secondary mb-4">
              Mitra Kami
            </span>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight text-brand-dark mb-5">
              Dipercaya oleh
            </h2>
            <div className="w-16 h-0.5 bg-brand-secondary mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal">
            {["Kementan", "Bappenas", "Pemprov Jatim", "Pemprov NTB", "Pemprov NTT", "Bulog", "Perum Jasa Tirta", "API"].map((mitra, i) => (
              <div key={i} className="bg-brand-cream rounded-xl px-6 py-8 text-center border border-black/5 hover:bg-brand-sage-light transition-colors duration-300">
                <div className="text-3xl mb-2">
                  {["🏛️", "📋", "🌾", "🌽", "🍚", "🏗️", "💧", "🤝"][i]}
                </div>
                <div className="text-sm font-semibold text-brand-dark">{mitra}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-brand-primary text-white text-center">
        <div className="max-w-[1200px] mx-auto px-6 reveal">
          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4">
            Siap Bekerja Sama?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Hubungi kami untuk diskusi tentang kebutuhan konsultasi pertanian Anda.
          </p>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-secondary text-[#1A1A1A] font-semibold rounded-lg hover:bg-[#B8862E] transition-all duration-300"
          >
            Hubungi Kami → 
          </Link>
        </div>
      </section>
    </>
  );
}
