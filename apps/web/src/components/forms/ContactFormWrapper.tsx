'use client';

import dynamic from "next/dynamic";

const ContactForm = dynamic(
  () => import("@/components/forms/ContactForm"),
  {
    loading: () => (
      <div className="bg-brand-cream rounded-2xl p-12 text-center">
        <div className="text-4xl mb-4 animate-pulse">⏳</div>
        <p className="text-sm text-[#6B6B6B]">Memuat form kontak...</p>
      </div>
    ),
    ssr: false,
  }
);

export default function ContactFormWrapper() {
  return <ContactForm />;
}
