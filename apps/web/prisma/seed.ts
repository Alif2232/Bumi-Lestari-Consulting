// ============================================
// 📁 apps/web/prisma/seed.ts
// ============================================
// Nama       : Database Seeder
// Fungsi     : Mengisi database dengan data awal:
//              - Admin user (email: admin@bumilestari.co.id)
//              - Sample projects & testimonials
// Penjelasan : Jalankan dengan: pnpm seed
//              atau: npx tsx prisma/seed.ts
// ============================================

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { hash } from "bcryptjs";

// 👇 Inisialisasi PrismaClient dengan adapter SQLite
//    Untuk production (PostgreSQL), ganti dengan:
//    const prisma = new PrismaClient();
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ---- ADMIN USER ----
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@bumilestari.co.id" },
    update: {},
    create: {
      email: "admin@bumilestari.co.id",
      name: "Admin Bumi Lestari",
      password: adminPassword,
      role: "admin",
    },
  });
  console.log(`✅ Admin user: ${admin.email} (password: admin123)`);

  // ---- SAMPLE PROJECTS ----
  const projects = [
    {
      icon: "🌾",
      tag: "Pemerintah Daerah",
      title: "Revitalisasi Lahan Sawah 5.000 Ha — Jawa Timur",
      description:
        "Pendampingan teknis untuk 2.300 petani, peningkatan hasil panen dari 4,2 ton/ha menjadi 6,8 ton/ha.",
      location: "Jawa Timur",
      year: "2024",
      metric: "+62% hasil",
    },
    {
      icon: "🌽",
      tag: "Kemitraan B2B",
      title: "Program Jagung Terintegrasi — NTB",
      description:
        "Menghubungkan 1.500 petani jagung dengan 3 pabrik pakan ternak.",
      location: "NTB",
      year: "2023-2024",
      metric: "45.000 ton/thn",
    },
    {
      icon: "🍚",
      tag: "Penelitian & Pengembangan",
      title: "Varietas Padi Tahan Kekeringan — NTT",
      description:
        "Uji coba 12 varietas padi di lahan kering NTT bekerja sama dengan Balitbangtan.",
      location: "NTT",
      year: "2022-2025",
      metric: "3 varietas baru",
    },
    {
      icon: "🌿",
      tag: "Investasi Swasta",
      title: "Kebun Kopi Arabika 1.000 Ha — Sumut",
      description:
        "Feasibility study & pendampingan investasi untuk perkebunan kopi Arabika specialty grade.",
      location: "Sumatera Utara",
      year: "2023-sekarang",
      metric: "Specialty Grade",
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`✅ ${projects.length} proyek contoh dibuat`);

  // ---- SAMPLE TESTIMONIALS ----
  await prisma.testimonial.create({
    data: {
      name: "Supriyadi",
      role: "Ketua Gapoktan Sumber Makmur, Jawa Tengah",
      quote:
        "Bumi Lestari membantu kami meningkatkan produktivitas sawah hingga 60% hanya dalam satu tahun.",
      badge: "farmer",
      stars: 5,
    },
  });

  await prisma.testimonial.create({
    data: {
      name: "Drs. H. Ahmad Fauzi, M.M.",
      role: "Kepala Dinas Pertanian, Provinsi Jawa Timur",
      quote:
        "Profesionalisme tim Bumi Lestari sangat impresif. Data dan rekomendasi yang disajikan selalu akurat.",
      badge: "government",
      stars: 5,
    },
  });
  console.log("✅ 2 testimoni contoh dibuat");

  console.log("\n🎉 Seeding selesai!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
