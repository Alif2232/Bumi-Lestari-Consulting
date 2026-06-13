import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/constants";

export default async function LayananDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = SERVICES.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-brand-cream to-brand-cream-dark">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link href="/layanan" className="inline-flex items-center gap-1 text-sm text-[#6B6B6B] hover:text-brand-primary transition-colors mb-6">
            ← Kembali ke Layanan
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-sage-light flex items-center justify-center text-4xl">
              {service.icon}
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-secondary">Layanan</span>
              <h1 className="font-serif text-3xl md:text-5xl leading-tight text-brand-dark">{service.title}</h1>
            </div>
          </div>
          <p className="text-base md:text-lg text-[#6B6B6B] max-w-3xl leading-relaxed">{service.description}</p>
        </div>
      </section>

      {/* Manfaat */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl text-brand-dark mb-8">Manfaat Layanan Ini</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "📊", title: "Berbasis Data", desc: "Setiap rekomendasi didukung analisis data lapangan dan riset terkini" },
              { icon: "👨‍🔬", title: "Tenaga Ahli", desc: "Ditangani langsung oleh agronomis dan pakar pertanian berpengalaman" },
              { icon: "🌿", title: "Ramah Lingkungan", desc: "Solusi berkelanjutan yang menjaga ekosistem dan kesuburan tanah jangka panjang" },
              { icon: "📈", title: "Hasil Terukur", desc: "Setiap intervensi diukur dampaknya dengan metrik yang jelas" },
              { icon: "🤝", title: "Pendampingan Penuh", desc: "Didampingi dari awal hingga evaluasi, bukan sekadar memberi saran" },
              { icon: "📋", title: "Laporan Detail", desc: "Laporan lengkap dan transparan untuk setiap proyek konsultasi" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-brand-cream border border-black/5">
                <div className="w-12 h-12 rounded-xl bg-brand-sage-light flex items-center justify-center text-2xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-brand-dark mb-1">{item.title}</h3>
                  <p className="text-sm text-[#6B6B6B]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-dark text-white text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-4xl leading-tight mb-4">Tertarik dengan Layanan Ini?</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">Hubungi kami untuk konsultasi gratis tentang {service.title.toLowerCase()}.</p>
          <Link href="/kontak" className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-accent text-white font-semibold rounded-xl hover:bg-[#A84A30] transition-all">
            📞 Konsultasi Gratis →
          </Link>
        </div>
      </section>
    </>
  );
}
