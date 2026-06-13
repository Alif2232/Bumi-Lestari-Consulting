// ============================================
// 📁 apps/web/src/lib/constants.ts
// ============================================
// Nama       : Data Konstan
// Fungsi     : Menyimpan data statis website (layanan, proyek,
//              testimoni, statistik, navigasi, kontak)
// Penjelasan : Data di sini bisa diganti nanti dengan data
//              dari database. Untuk sekarang, pakai data dummy
//              untuk prototyping dan demo
// ============================================

import type { Service, Project, Testimonial, Stat } from "@/types";

// 👇 Navigasi utama — muncul di Navbar
export const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Layanan", href: "#layanan" },
  { label: "Proyek", href: "#proyek" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Investor", href: "#investor" },
  { label: "Kontak", href: "#kontak" },
];

// 👇 Informasi kontak perusahaan
export const CONTACT_INFO = {
  email: "hello@bumilestari.co.id",
  phone: "+62 812-3456-7890",
  whatsapp: "6281234567890",
  address: "Jl. Agrowisata No. 42, Jakarta Selatan, 12560",
};

// 👇 Statistik utama — ditampilkan di Hero & StatsBanner
export const STATS: Stat[] = [
  {
    number: "12.400+",
    label: "Hektar Lahan Dikelola",
    description: "Tersebar di 15 provinsi",
  },
  {
    number: "8.200+",
    label: "Petani Binaan",
    description: "Program pendampingan berkelanjutan",
  },
  {
    number: "47",
    label: "Proyek Pemerintah",
    description: "Pusat & Daerah sejak 2018",
  },
  {
    number: "35%",
    label: "Peningkatan Hasil",
    description: "Rata-rata produktivitas lahan",
  },
];

// 👇 Layanan — 6 layanan utama Bumi Lestari
export const SERVICES: Service[] = [
  {
    id: "konsultasi-lahan",
    icon: "🌾",
    title: "Konsultasi & Analisis Lahan",
    description: "Analisis kesuburan tanah, pemetaan lahan, rekomendasi komoditas unggulan, dan perencanaan tanam berbasis data.",
    href: "/layanan/konsultasi-lahan",
  },
  {
    id: "manajemen-hama",
    icon: "🧪",
    title: "Manajemen Hama & Penyakit",
    description: "Deteksi dini, pengendalian hama terpadu (PHT), dan rekomendasi pestisida ramah lingkungan.",
    href: "/layanan/manajemen-hama",
  },
  {
    id: "pelatihan",
    icon: "👥",
    title: "Pelatihan & Pendampingan",
    description: "Program pelatihan petani, sekolah lapang, dan pendampingan teknis berkelanjutan untuk kelompok tani.",
    href: "/layanan/pelatihan",
  },
  {
    id: "program-pemerintah",
    icon: "🏛️",
    title: "Pendampingan Program Pemerintah",
    description: "Konsultasi dan pendampingan untuk program ketahanan pangan, bantuan benih, pupuk, dan irigasi.",
    href: "/layanan/program-pemerintah",
  },
  {
    id: "audit-lahan",
    icon: "📊",
    title: "Audit & Evaluasi Lahan",
    description: "Audit produktivitas lahan, analisis kelayakan investasi, dan rekomendasi pengembangan agribisnis.",
    href: "/layanan/audit-lahan",
  },
  {
    id: "kemitraan",
    icon: "🤝",
    title: "Kemitraan & Investasi",
    description: "Menjembatani investor dengan petani, feasibility study, dan pengelolaan proyek agribisnis terpadu.",
    href: "/layanan/kemitraan",
  },
];

// 👇 Proyek — 4 studi kasus unggulan
export const PROJECTS: Project[] = [
  {
    id: "revitalisasi-sawah-jatim",
    icon: "🌾",
    tag: "Pemerintah Daerah",
    title: "Revitalisasi Lahan Sawah 5.000 Ha — Jawa Timur",
    description: "Pendampingan teknis untuk 2.300 petani, peningkatan hasil panen dari 4,2 ton/ha menjadi 6,8 ton/ha dalam 2 musim.",
    location: "Jawa Timur",
    year: "2024",
    metric: "+62% hasil",
  },
  {
    id: "jagung-terintegrasi-ntb",
    icon: "🌽",
    tag: "Kemitraan B2B",
    title: "Program Jagung Terintegrasi — NTB",
    description: "Menghubungkan 1.500 petani jagung dengan 3 pabrik pakan ternak, menciptakan rantai pasok yang stabil dan harga yang adil.",
    location: "NTB",
    year: "2023-2024",
    metric: "45.000 ton/thn",
  },
  {
    id: "varietas-padi-ntt",
    icon: "🍚",
    tag: "Penelitian & Pengembangan",
    title: "Varietas Padi Tahan Kekeringan — NTT",
    description: "Uji coba 12 varietas padi di lahan kering NTT bekerja sama dengan Balitbangtan, hasil 3 varietas unggul baru.",
    location: "NTT",
    year: "2022-2025",
    metric: "3 varietas baru",
  },
  {
    id: "kebun-kopi-sumut",
    icon: "🌿",
    tag: "Investasi Swasta",
    title: "Kebun Kopi Arabika 1.000 Ha — Sumut",
    description: "Feasibility study & pendampingan investasi untuk perkebunan kopi Arabika specialty grade di dataran tinggi Sumatera Utara.",
    location: "Sumatera Utara",
    year: "2023-sekarang",
    metric: "Specialty Grade",
  },
];

// 👇 Testimoni — ulasan dari petani dan pemerintah
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimoni-petani",
    stars: 5,
    quote: "Bumi Lestari membantu kami meningkatkan produktivitas sawah hingga 60% hanya dalam satu tahun. Pendampingan teknisnya sangat detail dan mudah dipahami petani di lapangan.",
    name: "Supriyadi",
    role: "Ketua Gapoktan Sumber Makmur, Jawa Tengah",
    badge: "farmer",
  },
  {
    id: "testimoni-pemerintah",
    stars: 5,
    quote: "Profesionalisme tim Bumi Lestari sangat impresif. Data dan rekomendasi yang disajikan selalu akurat dan bisa dipertanggungjawabkan. Mitra yang tepat untuk program ketahanan pangan daerah.",
    name: "Drs. H. Ahmad Fauzi, M.M.",
    role: "Kepala Dinas Pertanian, Provinsi Jawa Timur",
    badge: "government",
  },
];

// 👇 Fitur untuk investor — ditampilkan di seksi InvestorCTA
export const INVESTOR_FEATURES = [
  "Feasibility study & analisis kelayakan investasi",
  "Portfolio proyek siap investasi di 7 provinsi",
  "Transparansi data: hasil panen, laporan keuangan, dampak ESG",
  "Pendampingan perizinan & kemitraan dengan pemerintah daerah",
  "Potensi ROI 15-25% per tahun — investasi berkelanjutan",
];

// 👇 Footer links
export const FOOTER_LINKS = {
  layanan: [
    { label: "Konsultasi Lahan", href: "/layanan/konsultasi-lahan" },
    { label: "Manajemen Hama", href: "/layanan/manajemen-hama" },
    { label: "Pelatihan Petani", href: "/layanan/pelatihan" },
    { label: "Program Pemerintah", href: "/layanan/program-pemerintah" },
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Tim Ahli", href: "/tentang#tim" },
    { label: "Karir", href: "/karir" },
    { label: "Blog", href: "/blog" },
  ],
};
