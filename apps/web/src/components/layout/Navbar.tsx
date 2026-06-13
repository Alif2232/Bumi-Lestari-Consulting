// ============================================
// 📁 apps/web/src/components/layout/Navbar.tsx
// ============================================
// Nama       : Navbar (Navigasi Atas)
// Fungsi     : Menu navigasi utama yang sticky di bagian atas
// Penjelasan : Navbar akan:
//              - Transparan saat di atas halaman
//              - Berubah jadi solid (background krem + blur) saat scroll > 60px
//              - Punya menu hamburger di HP
//              - Menutup otomatis saat link diklik
// ============================================

'use client';
// 👆 Client Component — perlu useState untuk menu mobile
//    dan useEffect untuk scroll listener

import { useState, useEffect } from "react";
import Link from "next/link";
// 👇 Link: navigasi Next.js tanpa reload halaman (SPA-like)
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
// 👆 Data navigasi dari constants.ts (array of {label, href})

export default function Navbar() {
  // 👇 isScrolled: state untuk mendeteksi scroll position
  const [isScrolled, setIsScrolled] = useState(false);
  // 👇 isMobileMenuOpen: state untuk buka/tutup menu di HP
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // 👇 Pasang event listener scroll saat komponen di-mount
    //    Fungsi ini akan dipanggil setiap kali user scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // 👆 { passive: true } = optimasi performa scroll

    // 👇 Cleanup: hapus listener saat komponen dibongkar
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 Tutup menu mobile saat link diklik
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        // 👇 Posisi: fixed di atas, z-index tinggi
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // 👇 Style berubah saat scroll
        isScrolled
          ? "bg-brand-cream/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* 👇 LOGO — kiri */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* 👇 Ikon lingkaran hijau dengan emoji */}
          <span className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
            🌱
          </span>
          {/* 👇 Nama perusahaan */}
          <span className="font-serif text-xl text-brand-primary font-medium">
            Bumi Lestari
            <span className="hidden sm:inline"> Consulting</span>
            {/* 👆 "Consulting" hanya muncul di layar >= sm (640px) */}
          </span>
        </Link>

        {/* 👇 DESKTOP MENU — tengah/kanan (hidden di HP) */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={handleLinkClick}
                className="relative text-sm font-medium text-[#3C3C3C] hover:text-brand-primary transition-colors duration-200
                  after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-brand-secondary
                  after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {/* 👇 Tombol CTA di dalam menu desktop */}
          <li>
            <Link
              href="#kontak"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-[#2D5A3F] hover:shadow-lg hover:shadow-brand-primary/30 transition-all duration-300"
            >
              Hubungi Kami
            </Link>
          </li>
        </ul>

        {/* 👇 MOBILE MENU TOGGLE — tombol hamburger (muncul hanya di HP) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
        >
          {/* 👇 Tiga garis hamburger — baris pertama */}
          <span
            className={cn(
              "block w-6 h-0.5 bg-brand-dark transition-all duration-300",
              isMobileMenuOpen && "rotate-45 translate-y-2"
              // 👆 Kalau menu terbuka: baris 1 miring 45° ke kanan
            )}
          />
          {/* 👇 Baris kedua — menghilang saat menu terbuka */}
          <span
            className={cn(
              "block w-6 h-0.5 bg-brand-dark transition-all duration-300",
              isMobileMenuOpen && "opacity-0"
            )}
          />
          {/* 👇 Baris ketiga — miring ke kiri saat menu terbuka */}
          <span
            className={cn(
              "block w-6 h-0.5 bg-brand-dark transition-all duration-300",
              isMobileMenuOpen && "-rotate-45 -translate-y-2"
            )}
          />
        </button>
      </div>

      {/* 👇 MOBILE MENU — dropdown (muncul saat tombol hamburger diklik) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl border border-black/5 p-6 animate-fade-in-up">
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block px-4 py-3 text-base font-medium text-[#3C3C3C] hover:bg-brand-cream rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {/* 👇 Tombol CTA mobile */}
            <li className="mt-2">
              <Link
                href="#kontak"
                onClick={handleLinkClick}
                className="block text-center px-5 py-3 bg-brand-primary text-white text-base font-semibold rounded-xl hover:bg-[#2D5A3F] transition-colors"
              >
                Hubungi Kami
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
