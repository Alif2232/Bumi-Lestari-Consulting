// ============================================
// 📁 apps/web/src/app/(protected)/admin/page.tsx
// ============================================
// Nama       : Admin Dashboard
// Fungsi     : Halaman utama setelah login admin
// Penjelasan : Menampilkan ringkasan data:
//              - Jumlah lead baru
//              - Jumlah proyek
//              - Jumlah testimoni
//              - Lead terbaru
//              Data diambil dari database via Prisma
// ============================================

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  // 👇 Cek session (lapisan keamanan kedua — selain layout)
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  // 👇 Ambil data dari database
  const [leadCount, projectCount, testimonialCount, recentLeads] = await Promise.all([
    prisma.lead.count(),
    prisma.project.count(),
    prisma.testimonial.count(),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const newLeads = await prisma.lead.count({
    where: { status: "new" },
  });

  return (
    <div className="max-w-[1200px] mx-auto px-6">
      {/* 👇 Selamat datang */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-brand-dark">
          Selamat Datang, {session.user?.name || "Admin"} 👋
        </h1>
        <p className="text-sm text-[#6B6B6B] mt-1">
          Ringkasan data Bumi Lestari Consulting
        </p>
      </div>

      {/* 👇 Kartu Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border border-black/5">
          <div className="text-3xl mb-2">📨</div>
          <div className="text-2xl font-bold text-brand-dark">{leadCount}</div>
          <div className="text-xs text-[#6B6B6B]">Total Lead Masuk</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-black/5">
          <div className="text-3xl mb-2">🆕</div>
          <div className="text-2xl font-bold text-brand-accent">{newLeads}</div>
          <div className="text-xs text-[#6B6B6B]">Lead Baru</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-black/5">
          <div className="text-3xl mb-2">📁</div>
          <div className="text-2xl font-bold text-brand-dark">{projectCount}</div>
          <div className="text-xs text-[#6B6B6B]">Total Proyek</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-black/5">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-brand-dark">{testimonialCount}</div>
          <div className="text-xs text-[#6B6B6B]">Testimoni</div>
        </div>
      </div>

      {/* 👇 Lead Terbaru */}
      <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
        <div className="px-6 py-4 border-b border-black/5">
          <h2 className="font-semibold text-brand-dark">📨 Lead Terbaru</h2>
        </div>
        {recentLeads.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-[#6B6B6B]">
            Belum ada lead masuk
          </div>
        ) : (
          <div className="divide-y divide-black/5">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="px-6 py-4 hover:bg-brand-cream/50 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-brand-dark">{lead.name}</span>
                  <span className="text-[10px] text-[#9A9A9A]">
                    {new Date(lead.createdAt).toLocaleDateString("id-ID")}
                  </span>
                </div>
                <div className="text-xs text-[#6B6B6B]">
                  {lead.email} — {lead.service}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
