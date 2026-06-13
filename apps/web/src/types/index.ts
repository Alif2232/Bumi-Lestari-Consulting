// ============================================
// 📁 apps/web/src/types/index.ts
// ============================================
// Nama       : Type Definitions
// Fungsi     : Mendefinisikan tipe data TypeScript yang
//              dipakai di seluruh komponen
// Penjelasan : TypeScript type = 'blueprint' bentuk data.
//              Memastikan data selalu konsisten dan terhindar
//              dari typo / kesalahan struktur data
// ============================================

// 👇 Layanan: satu item layanan yang ditawarkan
export interface Service {
  id: string;
  icon: string;          // Emoji ikon (🌾, 🧪, dll)
  title: string;         // Judul layanan
  description: string;   // Deskripsi singkat
  href: string;          // Link ke halaman detail
}

// 👇 Proyek: satu item portofolio/studi kasus
export interface Project {
  id: string;
  icon: string;          // Emoji ilustrasi
  tag: string;           // Label kategori (Pemerintah, B2B, dll)
  title: string;         // Judul proyek
  description: string;   // Deskripsi proyek
  location: string;      // Lokasi (📍 Jawa Timur)
  year: string;          // Tahun pelaksanaan
  metric: string;        // Metrik dampak (+62% hasil)
}

// 👇 Testimoni: ulasan dari klien
export interface Testimonial {
  id: string;
  stars: number;         // Jumlah bintang (1-5)
  quote: string;         // Isi testimoni
  name: string;          // Nama pemberi testimoni
  role: string;          // Jabatan
  badge: 'farmer' | 'government' | 'investor';  // Kategori
}

// 👇 Lead: data yang masuk dari form kontak
export interface Lead {
  id?: string;
  name: string;          // Nama lengkap
  email: string;         // Email
  phone: string;         // Nomor WhatsApp
  company?: string;      // Perusahaan (opsional)
  service: string;       // Layanan yang diminati
  message: string;       // Pesan
  createdAt?: Date;      // Waktu submit
}

// 👇 Stats: metrik utama di banner statistik
export interface Stat {
  number: string;        // Angka (12.400+)
  label: string;         // Label (Hektar Lahan Dikelola)
  description: string;   // Deskripsi tambahan
}
