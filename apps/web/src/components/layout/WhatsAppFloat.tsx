// ============================================
// 📁 apps/web/src/components/layout/WhatsAppFloat.tsx
// ============================================
// Nama       : WhatsApp Floating Button
// Fungsi     : Tombol WhatsApp yang selalu mengambang
//              di pojok kanan bawah. Memberikan akses
//              cepat ke customer service via WA.
// Penjelasan : Channel komunikasi utama untuk petani
//              yang lebih nyaman chat daripada email.
//              Tooltip muncul saat di-hover
// ============================================

'use client';
// 👆 Client Component — meskipun tidak ada state,
//    tetap perlu 'use client' karena menggunakan Link
//    navigasi eksternal ke WhatsApp

import { CONTACT_INFO } from "@/lib/constants";

export default function WhatsAppFloat() {
  // 👇 URL WhatsApp dengan nomor dan pesan standar
  const waUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=Halo%20Bumi%20Lestari%20Consulting%2C%20saya%20ingin%20konsultasi%20pertanian`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      // 👆 target="_blank": buka tab baru
      //    rel="noopener noreferrer": keamanan — mencegah
      //    website tujuan mengakses halaman asal
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="Hubungi via WhatsApp"
    >
      {/* 👇 Tooltip — muncul di samping tombol saat hover */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-white text-sm text-[#3C3C3C] px-4 py-2 rounded-lg shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
        Ada yang bisa kami bantu? 💬
      </span>

      {/* 👇 Lingkaran hijau WhatsApp dengan ikon */}
      <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white text-2xl shadow-lg shadow-[#25D366]/40 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/50 transition-all duration-300">
        💬
      </span>
    </a>
  );
}
