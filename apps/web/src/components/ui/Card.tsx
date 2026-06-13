// ============================================
// 📁 apps/web/src/components/ui/Card.tsx
// ============================================
// Nama       : Card (Kartu)
// Fungsi     : Komponen kartu reusable dengan efek hover.
//              Dipakai di Services, Projects, Testimonials
// Penjelasan : Kartu memiliki aksen garis di atas yang
//              muncul dari kiri ke kanan saat di-hover.
//              Ini memberi kesan hidup dan profesional
// ============================================

'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        // 👇 Style dasar kartu
        'bg-white rounded-2xl p-8 border border-black/5',
        // 👇 Efek hover: kartu naik 6px + shadow
        'transition-all duration-400 cursor-pointer',
        'hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(27,58,45,0.08)]',
        // 👇 Aksen garis hijau di atas (pseudo-element)
        'relative before:absolute before:top-0 before:left-0 before:right-0',
        'before:h-1 before:bg-brand-primary before:scale-x-0 before:origin-left',
        'hover:before:scale-x-100 before:transition-transform before:duration-400',
        className
      )}
    >
      {children}
    </div>
  );
}
