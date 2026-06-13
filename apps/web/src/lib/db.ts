// ============================================
// 📁 apps/web/src/lib/db.ts
// ============================================
// Nama       : Prisma Client Singleton
// Fungsi     : Membuat dan mengekspor instance PrismaClient
//              dengan pattern singleton (global caching)
// Penjelasan :
//   🏠 Dev (SQLite):   pakai @prisma/adapter-better-sqlite3
//   🚀 Production:     ganti adapter ke PrismaPg (PostgreSQL)
//                       atau hapus adapter (PrismaClient native)
//   Pattern global caching mencegah multiple instances
//   saat hot-reload di development (Next.js Fast Refresh)
// ============================================

import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";

// 👇 Buat adapter SQLite untuk development
//    Untuk production (PostgreSQL):
//    - Hapus 3 baris di bawah ini
//    - Gunakan: const prisma = new PrismaClient();
//    - Atau pakai @prisma/adapter-pg jika perlu connection pooling
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

// 👇 Global singleton: cegah multiple PrismaClient saat hot-reload
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 👇 Export prisma — gunakan instance global jika sudah ada
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

// 👇 Di development, simpan instance ke globalThis agar
//    tidak dibuat ulang setiap kali file di-re-require
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
