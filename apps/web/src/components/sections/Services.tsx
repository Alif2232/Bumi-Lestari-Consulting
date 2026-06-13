import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Services() {
  return (
    <section id="layanan" className="py-20 md:py-28 bg-brand-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <SectionHeader
            label="Layanan Kami"
            title={<>Solusi Lengkap untuk<br />Pertanian Berkelanjutan</>}
            description="Dari analisis tanah hingga pendampingan program pemerintah — Bumi Lestari hadir di setiap tahap untuk memastikan hasil yang optimal dan lestari."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.1}>
              <div className="group bg-white rounded-2xl p-8 border border-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(27,58,45,0.08)] relative before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-brand-primary before:scale-x-0 before:origin-left group-hover:before:scale-x-100 before:transition-transform before:duration-500">
                <div className="w-14 h-14 rounded-xl bg-brand-sage-light flex items-center justify-center text-3xl mb-6">
                  {service.icon}
                </div>
                <h3 className="font-serif text-xl text-brand-dark mb-3">{service.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-5">{service.description}</p>
                <Link href={service.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary group-hover:gap-2.5 transition-all duration-300">
                  Selengkapnya <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
