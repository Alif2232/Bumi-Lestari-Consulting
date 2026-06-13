import { TESTIMONIALS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Testimonials() {
  const getAvatar = (badge: string) => {
    switch (badge) {
      case "farmer": return "👨‍🌾";
      case "government": return "👔";
      case "investor": return "💼";
      default: return "👤";
    }
  };

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "farmer":
        return "bg-brand-secondary/15 text-[#8B6B2A]";
      case "government":
        return "bg-brand-primary/10 text-brand-primary";
      case "investor":
        return "bg-brand-accent/10 text-brand-accent";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getBadgeLabel = (badge: string) => {
    switch (badge) {
      case "farmer": return "Petani Binaan";
      case "government": return "Mitra Pemerintah";
      case "investor": return "Mitra Investasi";
      default: return "";
    }
  };

  return (
    <section id="testimoni" className="py-20 md:py-28 bg-brand-cream">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <SectionHeader
            label="Testimoni"
            title={<>Apa Kata Mereka<br />Tentang Bumi Lestari</>}
            description="Kepercayaan dari petani, pemerintah, dan mitra bisnis adalah pencapaian terbesar kami."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <ScrollReveal key={testimonial.id} delay={i * 0.2}>
              <div className="bg-white rounded-2xl p-8 border border-black/5">
                <div className="text-brand-secondary text-lg tracking-[0.15em] mb-4">
                  {"★".repeat(testimonial.stars)}
                </div>
                <p className="text-base text-[#3C3C3C] leading-relaxed italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-sage-light flex items-center justify-center text-xl flex-shrink-0">
                    {getAvatar(testimonial.badge)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#3C3C3C]">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-[#6B6B6B] mt-0.5">
                      {testimonial.role}
                    </div>
                    <span
                      className={`inline-block mt-1.5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full ${getBadgeStyle(testimonial.badge)}`}
                    >
                      {getBadgeLabel(testimonial.badge)}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
