// ============================================
// 📁 apps/web/src/components/layout/Footer.tsx
// ============================================
// Nama       : Footer
// Fungsi     : Bagian paling bawah website. Berisi logo,
//              menu layanan, menu perusahaan, info kontak,
//              sosial media, dan copyright.
// Penjelasan : Footer adalah Server Component (tanpa 'use client')
//              karena tidak perlu interaktivitas
// ============================================

import Link from "next/link";
import { CONTACT_INFO, FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-brand-cream-dark pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* 👇 Grid 4 kolom: Brand + Layanan + Perusahaan + Kontak */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* 👇 KOLOM 1: Logo & deskripsi perusahaan */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <span className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-lg">
                🌱
              </span>
              <span className="font-serif text-xl text-brand-primary font-medium">
                Bumi Lestari Consulting
              </span>
            </Link>
            <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-xs">
              Mitra strategis untuk pertanian Indonesia yang lebih maju,
              produktif, dan berkelanjutan. Berbasis data, berdampak nyata
              untuk generasi mendatang.
            </p>
          </div>

          {/* 👇 KOLOM 2: Menu Layanan */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-primary mb-5">
              Layanan
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.layanan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B6B6B] hover:text-brand-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 👇 KOLOM 3: Menu Perusahaan */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-primary mb-5">
              Perusahaan
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.perusahaan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B6B6B] hover:text-brand-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 👇 KOLOM 4: Kontak */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-brand-primary mb-5">
              Kontak
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-[#6B6B6B] hover:text-brand-primary transition-colors duration-200"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-sm text-[#6B6B6B] hover:text-brand-primary transition-colors duration-200"
                >
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="text-sm text-[#6B6B6B] leading-relaxed">
                {CONTACT_INFO.address}
              </li>
            </ul>
          </div>
        </div>

        {/* 👇 Garis pemisah */}
        <div className="border-t border-black/5 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* 👇 Copyright */}
          <p className="text-xs text-[#9A9A9A]">
            &copy; {new Date().getFullYear()} Bumi Lestari Consulting. All rights reserved.
          </p>

          {/* 👇 Sosial Media — lingkaran-lingkaran kecil */}
          <div className="flex gap-3">
            {[
              { label: "in", href: "#", aria: "LinkedIn" },
              { label: "YT", href: "#", aria: "YouTube" },
              { label: "IG", href: "#", aria: "Instagram" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.aria}
                className="w-9 h-9 rounded-full bg-black/5 flex items-center justify-center text-xs font-medium text-[#6B6B6B] hover:bg-brand-primary hover:text-white transition-all duration-300"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
