// ============================================
// 📁 apps/web/src/components/ui/Button.tsx
// ============================================
// Nama       : Button (Tombol)
// Fungsi     : Komponen tombol yang bisa dipakai ulang
//              di seluruh website dengan 3 varian:
//              - primary   (hijau solid)
//              - secondary (outline hijau)
//              - accent    (terracotta solid)
// Penjelasan : Menggunakan composition pattern — komponen
//              kecil yang bisa dikombinasikan. Menerima
//              props variant, size, href (jika link), dll
// ============================================

'use client';
// 👆 Client Component — diperlukan karena ada event handler
//    (onClick) dan useState untuk hover state

import React from 'react';
// 👇 cn: fungsi utility untuk menggabungkan class Tailwind
import { cn } from '@/lib/utils';
// 👇 Link: komponen navigasi Next.js (untuk internal link)
import Link from 'next/link';

// 👇 Tipe props yang diterima komponen Button
type ButtonVariant = 'primary' | 'secondary' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;   // Varian warna (default: primary)
  size?: ButtonSize;         // Ukuran (default: md)
  href?: string;             // Jika diisi, render sebagai <Link>
  children: React.ReactNode; // Konten di dalam tombol
  className?: string;        // Class tambahan dari luar
  onClick?: () => void;      // Fungsi saat diklik
  type?: 'button' | 'submit'; // Tipe tombol (default: button)
  disabled?: boolean;        // Status disabled
}

// 👇 Mapping varian ke class Tailwind
const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand-primary text-white hover:bg-[#2D5A3F] hover:shadow-lg hover:shadow-brand-primary/30',
  secondary: 'bg-transparent text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white',
  accent: 'bg-brand-accent text-white hover:bg-[#A84A30] hover:shadow-lg hover:shadow-brand-accent/30',
};

// 👇 Mapping ukuran ke class Tailwind (padding + font)
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-8 py-3.5 text-base',
  lg: 'px-10 py-4 text-lg',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  // 👇 Class gabungan: style varian + ukuran + class tambahan
  //    Semua digabung dengan fungsi cn()
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300 cursor-pointer',
    variantStyles[variant],
    sizeStyles[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  // 👇 Jika ada href, render sebagai Link Next.js
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // 👇 Jika tidak ada href, render sebagai <button> biasa
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
