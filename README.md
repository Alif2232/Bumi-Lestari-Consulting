<div align="center">
  <h1>🌾 Bumi Lestari Consulting</h1>
  <p><strong>Mitra Strategis untuk Agribisnis Berkelanjutan</strong></p>
  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js 15"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript" alt="TypeScript"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS v4"></a>
    <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-7.8-2d3748?style=flat-square&logo=prisma" alt="Prisma"></a>
    <a href="https://next-auth.js.org/"><img src="https://img.shields.io/badge/NextAuth-4.24-000000?style=flat-square" alt="NextAuth.js"></a>
    <a href="https://zod.dev/"><img src="https://img.shields.io/badge/Zod-4-3068b7?style=flat-square&logo=zod" alt="Zod"></a>
    <a href="https://www.sqlite.org/"><img src="https://img.shields.io/badge/SQLite-3-003b57?style=flat-square&logo=sqlite" alt="SQLite"></a>
  </p>
  <p>
    <a href="https://bumilestari.co.id">🌐 bumilestari.co.id</a> &nbsp;|&nbsp;
    <a href="mailto:hello@bumilestari.co.id">📧 hello@bumilestari.co.id</a>
  </p>
</div>

---

## 📋 Tentang Perusahaan

**Bumi Lestari Consulting** adalah perusahaan konsultan pertanian profesional yang berbasis di Indonesia. Kami menjembatani kesenjangan antara praktik pertanian tradisional dengan teknologi modern, membantu petani, pemerintah daerah, dan investor untuk mencapai produktivitas pertanian yang optimal dan berkelanjutan.

### Sektor Layanan

| Sektor | Deskripsi |
|--------|-----------|
| **B2F** (Business to Farmer) | Konsultasi langsung ke petani dan kelompok tani — analisis lahan, manajemen hama, pelatihan |
| **B2G** (Business to Government) | Pendampingan program ketahanan pangan pemerintah pusat dan daerah |
| **Investor** | Feasibility study, pencarian lahan, dan pengelolaan proyek agribisnis |

### Area Keahlian

- 🌾 **Konsultasi & Analisis Lahan** — Analisis kesuburan tanah, pemetaan lahan, rekomendasi komoditas
- 🧪 **Manajemen Hama & Penyakit** — Deteksi dini, pengendalian hama terpadu (PHT)
- 👥 **Pelatihan & Pendampingan** — Program pelatihan petani, sekolah lapang
- 🏛️ **Pendampingan Program Pemerintah** — Program ketahanan pangan, bantuan benih & pupuk
- 📊 **Audit & Evaluasi Lahan** — Audit produktivitas, analisis kelayakan investasi
- 🤝 **Kemitraan & Investasi** — Menjembatani investor dengan petani

---

## 🚀 Tech Stack

| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| [Next.js](https://nextjs.org/) | 15 | React framework (App Router, Server Components) |
| [TypeScript](https://www.typescriptlang.org/) | 5.7 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first CSS (zero-config, CSS-only) |
| [Prisma](https://www.prisma.io/) | 7.8 | ORM — database management |
| [SQLite](https://www.sqlite.org/) | 3 | Database development (PostgreSQL untuk production) |
| [NextAuth.js](https://next-auth.js.org/) | 4.24 | Autentikasi admin |
| [Zod](https://zod.dev/) | 4 | Validasi form (client + server) |
| [Resend](https://resend.com/) | 6 | Email notification |
| [Lucide React](https://lucide.dev/) | 0.460 | Icon library |

### Arsitektur

```
📦 Bumi-Lestari-Consulting
├── 🎨 apps/web          — Frontend & Backend (Next.js monolitik)
│   ├── 🖥️  App Router  — 15 rute (7 static + 8 dynamic)
│   ├── 🗄️  Prisma      — Schema + ORM
│   ├── 🔐 NextAuth     — Admin authentication
│   └── 📧 Resend       — Email notification
├── 📦 packages/         — Shared libraries (future)
├── 🛠️  services/       — Microservices (future)
└── ⚙️  infra/          — Infrastructure (future)
```

---

## ✨ Fitur Website

### Publik
| Fitur | Rute | Status |
|-------|------|--------|
| 🏠 **Beranda** — Hero, statistik, layanan, proyek, testimoni, CTA investor | `/` | ✅ |
| 📋 **Layanan** — 6 layanan utama + detail per layanan | `/layanan`, `/layanan/[slug]` | ✅ |
| 👥 **Tentang Kami** — Profil perusahaan, tim, visi-misi | `/tentang` | ✅ |
| 📝 **Blog** — 6 artikel + detail artikel | `/blog`, `/blog/[id]` | ✅ |
| 💼 **Karir** — Lowongan pekerjaan | `/karir` | ✅ |
| 📬 **Kontak** — Form kontak dengan validasi + API + notifikasi email | `/kontak` | ✅ |

### Admin (terproteksi)
| Fitur | Rute | Status |
|-------|------|--------|
| 🔐 **Login** — Autentikasi admin via NextAuth | `/admin/login` | ✅ |
| 📊 **Dashboard** — Statistik + lead terbaru | `/admin` | ✅ |
| 📨 **Lead Masuk** — Data form kontak dari database | `/admin/leads` | ✅ |
| 📁 **Proyek** — CRUD manajemen proyek portofolio | `/admin/proyek` | ✅ |

### API
| Endpoint | Method | Fungsi |
|----------|--------|--------|
| `/api/auth/[...nextauth]` | GET/POST | Autentikasi admin |
| `/api/lead` | POST | Kirim data form kontak (validasi + simpan DB + email) |
| `/api/lead` | GET | Health check |

---

## 🛠️ Panduan Instalasi

### Prasyarat
- **Node.js** ≥ 18.18 (recommended: 22 LTS)
- **pnpm** ≥ 9.0 ([install guide](https://pnpm.io/installation))
- **Git**

### 1. Clone Repository

```bash
git clone https://github.com/Alif2232/Bumi-Lestari-Consulting.git
cd Bumi-Lestari-Consulting
```

### 2. Install Dependencies

```bash
cd apps/web
pnpm install
```

### 3. Setup Environment

```bash
cp .env.example .env
```

Edit file `.env`:

```env
# Database (SQLite untuk development — auto-generate)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-secure-random-string>

# Resend (opsional — untuk email notifikasi lead)
# Daftar gratis di https://resend.com
RESEND_API_KEY=
NOTIFICATION_EMAIL=admin@bumilestari.co.id
```

### 4. Setup Database & Seed

```bash
# Generate Prisma client + migrate database
npx prisma migrate dev --name init

# Seed data awal (admin + sample data)
pnpm seed
```

### 5. Jalankan Development Server

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 6. Login Admin

| Email | Password |
|-------|----------|
| `admin@bumilestari.co.id` | `admin123` |

> ⚠️ **Keamanan:** Ganti password segera setelah login pertama!

---

## 📁 Struktur Proyek

```
apps/web/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts             # Seed data
├── src/
│   ├── app/
│   │   ├── (public)/       # Halaman publik (beranda, tentang, layanan, blog, kontak, karir)
│   │   ├── (auth)/         # Halaman autentikasi (login)
│   │   ├── (protected)/    # Halaman admin (dashboard, leads, proyek)
│   │   └── api/            # API routes (auth, lead)
│   ├── components/
│   │   ├── ui/             # Komponen primitif (Button, Card, SectionHeader)
│   │   ├── layout/         # Layout (Navbar, Footer, WhatsAppButton)
│   │   ├── sections/       # Section landing page (Hero, Services, Projects, dll)
│   │   └── forms/          # Form components (ContactForm, ContactFormWrapper)
│   ├── lib/
│   │   ├── auth.ts         # NextAuth konfigurasi
│   │   ├── db.ts           # Prisma client singleton
│   │   ├── email.ts        # Email notification utility
│   │   ├── constants.ts    # Data statis (layanan, proyek, testimoni)
│   │   ├── validation.ts   # Zod schema validasi
│   │   └── utils.ts        # Utility functions (cn, formatDate)
│   └── types/
│       └── index.ts        # TypeScript interfaces
├── .env                    # Environment variables (jangan commit)
├── next.config.ts          # Next.js configuration
└── package.json            # Dependencies
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
cd apps/web
vercel --prod
```

Set environment variables di dashboard Vercel:
- `DATABASE_URL` → PostgreSQL connection string (ganti dari SQLite)
- `NEXTAUTH_URL` → https://bumilestari.co.id
- `NEXTAUTH_SECRET` → random secure string
- `RESEND_API_KEY` → dari Resend (untuk email notifikasi)
- `NOTIFICATION_EMAIL` → email admin

> **Catatan Production:** SQLite hanya untuk development. Untuk production, ubah provider Prisma ke `postgresql` dan gunakan database PostgreSQL (misal: Neon, Supabase, Railway).

---

## 🎨 Desain

### Brand Identity

| Elemen | Spesifikasi |
|--------|-------------|
| **Warna Utama** | Forest Green (`#1B3A2D`) |
| **Warna Aksen** | Harvest Gold (`#C8963E`) |
| **Warna Latar** | Warm Cream (`#F8F5F0`) |
| **Font Judul** | DM Serif Display (serif, elegan) |
| **Font Body** | DM Sans (sans-serif, modern) |

### Performa

| Metrik | Hasil |
|--------|-------|
| First Load JS Shared | **102 kB** |
| Total Rute | **15** (7 static + 8 dynamic) |
| Waktu Build | **~3-4 detik** |
| Server Components | ✅ 5 section (Hero, Stats, Services, Projects, Testimonials) |
| Dynamic Import | ✅ ContactForm (Zod 20 kB → 1.39 kB) |
| Font Loading | ✅ next/font (preload, self-hosted) |

---

## 🤝 Kontribusi

Kami menyambut kontribusi dari tim internal. Untuk perubahan besar, silakan buat issue terlebih dahulu.

1. Fork repository
2. Buat branch fitur: `git checkout -b feat/fitur-baru`
3. Commit perubahan: `git commit -m "feat: menambahkan fitur baru"`
4. Push ke branch: `git push origin feat/fitur-baru`
5. Buat Pull Request

### Standar Coding
- TypeScript strict mode
- Komentar Bahasa Indonesia untuk setiap logika penting
- Prettier + ESLint
- Conventional commits
- Test sebelum merge

---

## 📄 Lisensi

Hak Cipta © 2026 **Bumi Lestari Consulting**. Seluruh hak cipta dilindungi.

Tidak diperkenankan mendistribusikan, memodifikasi, atau menggunakan kode ini tanpa izin tertulis dari pemilik.

---

<div align="center">
  <p>Dibangun dengan ❤️ untuk pertanian Indonesia</p>
  <p>
    <a href="https://github.com/Alif2232/Bumi-Lestari-Consulting">GitHub</a> ·
    <a href="mailto:hello@bumilestari.co.id">Kontak</a> ·
    <a href="https://bumilestari.co.id">Website</a>
  </p>
</div>
