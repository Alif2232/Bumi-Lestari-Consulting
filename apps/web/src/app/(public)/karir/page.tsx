// ============================================
// 📁 apps/web/src/app/(public)/karir/page.tsx
// ============================================
// Nama       : Halaman Karir
// Fungsi     : Menampilkan lowongan pekerjaan di Bumi Lestari
// Penjelasan : Berisi daftar posisi yang dibuka, benefit
//              bekerja, dan cara melamar
// ============================================

import Link from "next/link";

const VACANCIES = [
  { icon: "👨‍🔬", title: "Agronomis Lapangan", type: "Full-time", loc: "Jakarta & 5 kota lain", desc: "Bertanggung jawab melakukan pendampingan teknis kepada petani dan analisis kondisi lahan." },
  { icon: "📊", title: "Analis Data Pertanian", type: "Full-time", loc: "Jakarta", desc: "Mengolah dan menganalisis data pertanian untuk mendukung rekomendasi konsultasi." },
  { icon: "🤝", title: "Relationship Manager", type: "Full-time", loc: "Jakarta", desc: "Menjalin dan memelihara hubungan dengan mitra pemerintah, investor, dan petani." },
  { icon: "💻", title: "IT Support", type: "Kontrak", loc: "Jakarta", desc: "Mendukung infrastruktur IT perusahaan dan pengembangan platform digital." },
];

export default function KarirPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-brand-cream to-brand-cream-dark">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-brand-secondary mb-4">Karir</span>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight text-brand-dark mb-5">Bergabung dengan<br />Bumi Lestari</h1>
          <div className="w-16 h-0.5 bg-brand-secondary mx-auto mb-5" />
          <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
            Jadilah bagian dari tim yang berkontribusi langsung pada ketahanan pangan Indonesia.
          </p>
        </div>
      </section>

      {/* Kenapa Bekerja di Bumi Lestari */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-12">Kenapa Bekerja di Bumi Lestari?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🌱", title: "Dampak Nyata", desc: "Setiap proyek yang Anda kerjakan langsung membantu petani Indonesia" },
              { icon: "📈", title: "Tumbuh Bersama", desc: "Program pengembangan kompetensi berkelanjutan dan jenjang karir jelas" },
              { icon: "🏡", title: "Lingkungan Kerja", desc: "Budaya kerja kolaboratif, fleksibel, dan menghargai kontribusi setiap individu" },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-brand-cream border border-black/5">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-serif text-xl text-brand-dark mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B6B6B]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lowongan */}
      <section className="py-16 md:py-24 bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark text-center mb-4">Lowongan Tersedia</h2>
          <p className="text-[#6B6B6B] text-center mb-12">Beberapa posisi yang sedang kami buka</p>
          <div className="space-y-4">
            {VACANCIES.map((job, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-black/5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-xl bg-brand-sage-light flex items-center justify-center text-3xl flex-shrink-0">{job.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-brand-dark">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-medium">{job.type}</span>
                    <span className="text-xs text-[#6B6B6B]">📍 {job.loc}</span>
                  </div>
                  <p className="text-sm text-[#6B6B6B] mt-2">{job.desc}</p>
                </div>
                <Link href="/kontak" className="px-6 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-[#2D5A3F] transition-all text-center whitespace-nowrap">
                  Lamar Sekarang →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-dark text-white text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-4xl leading-tight mb-4">Tidak Ada yang Cocok?</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">Tetap kirim CV Anda — kami selalu terbuka untuk talenta terbaik.</p>
          <Link href="/kontak" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-secondary text-brand-dark font-semibold rounded-xl hover:bg-[#B8862E] transition-all">
            ✉️ Kirim CV Spontan →
          </Link>
        </div>
      </section>
    </>
  );
}
