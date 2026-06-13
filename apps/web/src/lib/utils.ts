// ============================================
// 📁 apps/web/src/lib/utils.ts
// ============================================
// Nama       : Utility Functions
// Fungsi     : Fungsi-fungsi kecil yang dipakai di
//              berbagai komponen
// Penjelasan : Prinsip DRY (Don't Repeat Yourself) —
//              kode yang sering dipakai ditulis sekali di sini
// ============================================

// 👇 cn: menggabungkan class Tailwind dengan benar
//    Menggunakan clsx untuk conditional class + tailwind-merge
//    untuk menghandled konflik class (misal: px-4 dan px-6)
//    Fungsi ini standar di project Next.js + Shadcn UI
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 👇 formatNumber: memformat angka dengan separator ribuan
//    Contoh: 12400 -> "12.400" (format Indonesia)
export function formatNumber(num: number): string {
  return num.toLocaleString("id-ID");
}

// 👇 slugify: mengubah teks menjadi URL-friendly
//    Contoh: "Konsultasi Lahan" -> "konsultasi-lahan"
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

// 👇 getInitials: mengambil inisial dari nama
//    Contoh: "Bumi Lestari" -> "BL"
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
