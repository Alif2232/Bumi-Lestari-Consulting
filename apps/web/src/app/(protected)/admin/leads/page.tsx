// ============================================
// 📁 apps/web/src/app/(protected)/admin/leads/page.tsx
// ============================================
// Nama       : Admin — Daftar Lead
// Fungsi     : Menampilkan semua data form kontak yang masuk
// Penjelasan : Data diambil dari database via Prisma.
//              Status lead: new, contacted, qualified, closed
// ============================================

import { prisma } from "@/lib/db";

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      new: "bg-blue-100 text-blue-700",
      contacted: "bg-yellow-100 text-yellow-700",
      qualified: "bg-green-100 text-green-700",
      closed: "bg-gray-100 text-gray-500",
    };
    return colors[status] || "bg-gray-100 text-gray-500";
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-brand-dark">📨 Lead Masuk</h1>
        <p className="text-sm text-[#6B6B6B] mt-1">Total {leads.length} lead</p>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-black/5">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-[#6B6B6B]">Belum ada lead masuk</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-black/5 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-brand-cream text-left">
              <tr>
                <th className="px-5 py-3 font-semibold text-brand-dark">Nama</th>
                <th className="px-5 py-3 font-semibold text-brand-dark">Kontak</th>
                <th className="px-5 py-3 font-semibold text-brand-dark">Layanan</th>
                <th className="px-5 py-3 font-semibold text-brand-dark">Status</th>
                <th className="px-5 py-3 font-semibold text-brand-dark">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-brand-cream/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-medium text-brand-dark">{lead.name}</div>
                    {lead.company && <div className="text-xs text-[#9A9A9A]">{lead.company}</div>}
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-[#6B6B6B]">{lead.email}</div>
                    <div className="text-xs text-[#9A9A9A]">{lead.phone}</div>
                  </td>
                  <td className="px-5 py-4 text-[#6B6B6B]">{lead.service.replace("-", " ")}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block px-2.5 py-1 text-[10px] font-semibold uppercase rounded-full ${statusBadge(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-[#9A9A9A]">
                    {new Date(lead.createdAt).toLocaleDateString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
