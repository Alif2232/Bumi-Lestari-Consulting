// ============================================
// 📁 apps/web/src/app/(protected)/layout.tsx
// ============================================
// Nama       : Protected Layout
// Fungsi     : Layout untuk halaman yang butuh login.
//              Jika user belum login, redirect ke /admin/login.
//              Layout ini adalah Server Component — auth
//              dicek di server side, aman dari manipulasi client
// Penjelasan : Route group (protected) membungkus halaman
//              /admin dan /investor. Semua halaman di dalam
//              grup ini otomatis terproteksi
// ============================================

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 👇 getServerSession: ambil session dari server
  //    (tidak bisa dipalsukan oleh client)
  const session = await getServerSession(authOptions);

  // 👇 Jika tidak ada session, redirect ke halaman login
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen pt-24 bg-brand-cream">
      {/* 👇 Navigasi admin sederhana */}
      <nav className="bg-white border-b border-black/5 sticky top-[72px] z-30">
        <div className="max-w-[1200px] mx-auto px-6 flex items-center gap-6 h-12">
          <a href="/admin" className="text-sm font-medium text-brand-primary hover:text-brand-primary-light transition-colors">
            📊 Dashboard
          </a>
          <a href="/admin/leads" className="text-sm font-medium text-[#6B6B6B] hover:text-brand-primary transition-colors">
            📨 Lead Masuk
          </a>
          <a href="/admin/proyek" className="text-sm font-medium text-[#6B6B6B] hover:text-brand-primary transition-colors">
            📁 Proyek
          </a>
          <a href="/" className="text-sm font-medium text-[#6B6B6B] hover:text-brand-primary transition-colors ml-auto">
            ← Lihat Website
          </a>
          <a href="/api/auth/signout" className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
            Keluar
          </a>
        </div>
      </nav>

      <main className="py-8">
        {children}
      </main>
    </div>
  );
}
