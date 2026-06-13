import type { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  description: string;
}

export default function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-16">
      <span className="inline-block text-sm font-semibold uppercase tracking-widest text-brand-secondary mb-4">
        {label}
      </span>
      <h2 className="font-serif text-3xl md:text-5xl leading-tight text-[#1A1A1A] mb-5">
        {title}
      </h2>
      <div className="w-16 h-0.5 bg-brand-secondary mx-auto mb-5" />
      <p className="text-base md:text-lg text-[#6B6B6B] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
