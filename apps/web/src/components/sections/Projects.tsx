import { PROJECTS } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Projects() {
  return (
    <section id="proyek" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <ScrollReveal>
          <SectionHeader
            label="Proyek Kami"
            title={<>Dampak Nyata dari<br />Bumi Lestari</>}
            description="Setiap proyek adalah bukti komitmen kami terhadap pertanian Indonesia yang lebih modern, produktif, dan berkelanjutan."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.15}>
              <div className="group rounded-2xl overflow-hidden bg-brand-cream transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(27,58,45,0.1)]">
                <div className="h-52 bg-gradient-to-br from-brand-sage-light to-brand-cream-dark flex items-center justify-center text-5xl">
                  {project.icon}
                </div>
                <div className="p-7">
                  <span className="inline-block px-3 py-1 bg-brand-primary text-white text-xs font-semibold rounded mb-3">
                    {project.tag}
                  </span>
                  <h3 className="font-serif text-xl text-brand-dark mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-[#9A9A9A]">
                    <span className="flex items-center gap-1">
                      📍 {project.location}
                    </span>
                    <span className="flex items-center gap-1">
                      📅 {project.year}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-brand-primary">
                      {project.metric}
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
