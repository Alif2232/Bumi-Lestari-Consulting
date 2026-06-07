# Project Plan: UMKM SaaS Management Platform (MVP)

## 1. Project Overview
Membangun aplikasi SaaS berbasis web (Mobile-First PWA) untuk membantu pelaku UMKM di Indonesia mengelola keuangan, stok, dan hutang/piutang dengan cara yang sangat sederhana. 
Filosofi utama: **"Sederhana, Cepat, dan Terintegrasi WhatsApp"**. Hindari istilah akuntansi yang rumit. Gunakan bahasa sehari-hari (misal: "Uang Masuk" bukan "Debit", "Untung" bukan "Laba Bersih").

## 2. Tech Stack (Strict)
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI + Lucide React (Icons)
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js (Auth.js) dengan Prisma Adapter (atau Clerk jika lebih disarankan untuk kecepatan)
- **File Upload**: UploadThing (untuk foto produk/struk, lebih simpel daripada setup S3 manual)
- **State Management**: Zustand (jika diperlukan, utamakan React Server Components)
- **Utilities**: date-fns (format tanggal), jspdf atau react-to-pdf (untuk struk)

## 3. Core Features (MVP Scope)
Aplikasi hanya fokus pada 5 modul utama:
1. **Onboarding & Auth**: Registrasi super cepat (Nama, Nama Toko, No. WhatsApp).
2. **Dashboard**: Ringkasan visual sederhana: Total Uang Masuk, Total Uang Keluar, Saldo Saat Ini, dan 3 transaksi terakhir.
3. **Arus Kas (Cashflow)**: CRUD sederhana untuk mencatat Pemasukan dan Pengeluaran dengan kategori yang sudah ditentukan (dropdown).
4. **Inventaris Dasar**: Daftar produk (Nama, Harga Jual, Harga Modal, Stok). Fitur "Stok Masuk" dan "Stok Keluar". Notifikasi visual jika stok < 5.
5. **Hutang & Piutang**: Pencatatan nama orang, nominal, dan jatuh tempo. **Fitur Wajib**: Tombol "Ingatkan via WhatsApp" yang membuka `wa.me` dengan template pesan otomatis.
6. **Struk/Invoice Sederhana**: Tampilan struk digital yang bisa di-screenshot atau di-share langsung ke WhatsApp.

## 4. Database Schema (Prisma Draft)
Gunakan ini sebagai acuan utama untuk `schema.prisma`:

```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  businessName  String
  phone         String    @unique // Format: 628xxx
  password      String
  transactions  Transaction[]
  products      Product[]
  debts         Debt[]
  createdAt     DateTime  @default(now())
}

model Transaction {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  type        TransactionType // INCOME | EXPENSE
  amount      Float
  category    String   // e.g., "Penjualan", "Bahan Baku", "Listrik"
  description String?
  date        DateTime @default(now())
  createdAt   DateTime @default(now())
}

model Product {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  name        String
  sellPrice   Float
  costPrice   Float
  stock       Int      @default(0)
  imageUrl    String?
  createdAt   DateTime @default(now())
}

model Debt {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  type        DebtType // HUTANG (we owe) | PIUTANG (they owe us)
  personName  String
  amount      Float
  dueDate     DateTime
  isPaid      Boolean  @default(false)
  notes       String?
  createdAt   DateTime @default(now())
}

enum TransactionType {
  INCOME
  EXPENSE
}

enum DebtType {
  HUTANG
  PIUTANG
}


---

### Tips Tambahan Saat Berinteraksi dengan AI Menggunakan File Ini:
1. **Iterasi Per Step**: Setelah AI menyelesaikan *Step 1*, minta ia untuk berhenti dan memberi tahu Anda. Lalu perintahkan: *"Step 1 selesai. Lanjut ke Step 2."* Ini mencegah AI kehabisan *token* atau menghasilkan kode yang terpotong.
2. **Koreksi Spesifik**: Jika AI membuat sidebar alih-alih bottom nav, langsung tegur: *"Ingat Rule UI/UX No. 1 di plan.md: Mobile-First dengan Bottom Navigation. Perbaiki kode ini."*
3. **Mock Data**: Minta AI untuk menyertakan *seed script* (`prisma/seed.ts`) agar saat Anda menjalankan aplikasi pertama kali, sudah ada data dummy (transaksi, produk) untuk melihat tampilan dashboard dengan baik.