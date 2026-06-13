// ============================================
// 📁 apps/web/src/app/(protected)/admin/proyek/page.tsx
// ============================================
// Nama       : Admin — Daftar Proyek
// Fungsi     : Menampilkan dan mengelola proyek portofolio
// Penjelasan : Data dari database Prisma. Tampilan tabel
//              dengan opsi edit/hapus (masih placeholder)
// ============================================

import { prisma } from "@/lib/db";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminProyekPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-brand-dark">📁 Proyek</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">Total {projects.length} proyek</p>
        </div>
        <button className="px-5 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-[#2D5A3F] transition-all">
          + Tambah Proyek
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-black/5">
          <div className="text-5xl mb-4">📂</div>
          <p className="text-[#6B6B6B]">Belum ada proyek. Tambahkan proyek pertama Anda!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl p-6 border border-black/5 flex items-center gap-5 hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-sage-light flex items-center justify-center text-2xl flex-shrink-0">{project.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary font-medium">{project.tag}</span>
                  {project.isActive && <span className="text-[10px] text-green-600 font-medium">● Aktif</span>}
                </div>
                <h3 className="font-medium text-brand-dark truncate">{project.title}</h3>
                <p className="text-xs text-[#6B6B6B] mt-0.5">{project.location} — {project.year} — {project.metric}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button className="px-4 py-2 text-xs font-medium text-brand-primary bg-brand-primary/5 rounded-lg hover:bg-brand-primary/10 transition-all">✏️ Edit</button>
                <button className="px-4 py-2 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-all">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-[#6B6B6B] hover:text-brand-primary transition-colors">
          ← Kembali ke halaman utama
        </Link>
      </div>
    </div>
  );
}
