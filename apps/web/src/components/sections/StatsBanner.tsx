// ============================================
// 📁 apps/web/src/components/sections/StatsBanner.tsx
// ============================================
// Nama       : Stats Banner
// Fungsi     : Menampilkan 4 metrik utama perusahaan
//              dalam bentuk banner hijau gelap penuh
// Penjelasan : Letaknya setelah Hero. Memberikan dampak
//              visual langsung — angka besar membuktikan
//              kredibilitas perusahaan. Background pattern
//              grid dot halus untuk tekstur
// ============================================

import { STATS } from "@/lib/constants";
// 👆 Data statistik dari constants.ts

export default function StatsBanner() {
  return (
    // 👇 Background hijau gelap dengan dot pattern di atasnya
    <section className="relative bg-brand-primary py-14 md:py-16 overflow-hidden">
      {/* 👇 Dot pattern — tekstur halus dari SVG inline */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* 👇 Grid 4 kolom (2 kolom di HP) */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat) => (
          <div key={stat.number} className="text-center text-white">
            {/* 👇 Angka besar — warna emas */}
            <div className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-secondary mb-1">
              {stat.number}
            </div>
            {/* 👇 Label */}
            <div className="text-sm md:text-base opacity-80 font-medium">
              {stat.label}
            </div>
            {/* 👇 Deskripsi (opacity lebih rendah) */}
            <div className="text-xs md:text-sm opacity-50 mt-1">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
