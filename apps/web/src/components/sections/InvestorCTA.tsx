import { INVESTOR_FEATURES } from "@/lib/constants";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function InvestorCTA() {
  return (
    <section id="investor" className="relative py-20 md:py-28 bg-brand-dark overflow-hidden">
      <div className="absolute -bottom-20 -right-10 text-[20rem] opacity-[0.03] pointer-events-none select-none rotate-12">
        🌾
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <div>
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-semibold uppercase tracking-widest text-brand-secondary mb-4">
                For Investors
              </span>
              <h2 className="font-serif text-3xl md:text-5xl leading-tight text-white mb-5">
                Investasi Lestari untuk<br />
                Masa Depan Pangan
              </h2>
              <div className="w-16 h-0.5 bg-brand-secondary mx-auto mb-5" />
              <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
                Bumi Lestari membuka peluang kemitraan investasi di sektor
                agribisnis dengan potensi pertumbuhan tinggi dan dampak sosial
                yang nyata.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="text-center lg:text-left">
                <a
                  href="#"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-brand-accent text-white text-base font-semibold rounded-xl hover:bg-[#A84A30] hover:shadow-xl hover:shadow-brand-accent/30 transition-all duration-300"
                >
                  📥 Unduh Pitch Deck
                </a>
                <p className="text-xs text-white/40 mt-3">
                  PDF, 5MB — perkenalkan diri Anda untuk mengunduh
                </p>
              </div>

              <div className="space-y-4">
                {INVESTOR_FEATURES.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 text-white/80 text-sm md:text-base"
                  >
                    <span className="w-7 h-7 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary text-xs flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
