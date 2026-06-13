// ============================================
// 📁 apps/web/src/lib/validation.ts
// ============================================
// Nama       : Validasi Form (Zod Schema)
// Fungsi     : Mendefinisikan aturan validasi untuk setiap
//              form di website (kontak, subscribe)
// Penjelasan : Zod = library validasi data TypeScript.
//              Memastikan data yang masuk sesuai format sebelum
//              diproses lebih lanjut. Mencegah SQL injection,
//              XSS, dan data sampah dari bot spam
// ============================================

import { z } from "zod";

// 👇 contactFormSchema: aturan validasi untuk form kontak
//    setiapp field punya aturan sendiri:
//    - nama     : minimal 3 karakter, maksimal 100
//    - email    : format email valid
//    - phone    : format nomor WA Indonesia (08xx / +628xx)
//    - service  : harus salah satu dari daftar layanan
//    - message  : minimal 10 karakter, maksimal 2000
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, "Nama minimal 3 karakter")
    .max(100, "Nama maksimal 100 karakter"),
  email: z
    .string()
    .email("Format email tidak valid"),
  phone: z
    .string()
    .regex(
      /^(\+62|62|0)8[1-9][0-9]{6,11}$/,
      "Nomor WhatsApp tidak valid (contoh: 08123456789)"
    ),
  company: z
    .string()
    .max(100, "Nama perusahaan maksimal 100 karakter")
    .optional(),
  service: z.enum(
    [
      "konsultasi-lahan",
      "manajemen-hama",
      "pelatihan",
      "program-pemerintah",
      "audit-lahan",
      "kemitraan",
      "lainnya",
    ] as const,
    { message: "Pilih layanan yang tersedia" }
  ),
  message: z
    .string()
    .min(10, "Pesan minimal 10 karakter")
    .max(2000, "Pesan maksimal 2000 karakter"),
});

// 👇 Tipe data hasil validasi — otomatis dari schema Zod
export type ContactFormData = z.infer<typeof contactFormSchema>;

// 👇 subscribeSchema: validasi form newsletter (hanya email)
export const subscribeSchema = z.object({
  email: z
    .string()
    .email("Format email tidak valid"),
});

export type SubscribeFormData = z.infer<typeof subscribeSchema>;
