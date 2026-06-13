import { CONTACT_INFO } from "@/lib/constants";
import ContactForm from "@/components/forms/ContactFormWrapper";

export default function KontakPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-brand-cream to-brand-cream-dark">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-brand-secondary mb-4">Hubungi Kami</span>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight text-brand-dark mb-5">Mari Bicarakan<br />Kebutuhan Pertanian Anda</h1>
          <div className="w-16 h-0.5 bg-brand-secondary mx-auto mb-5" />
          <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
            Tim Bumi Lestari siap mendengarkan dan memberikan solusi terbaik untuk pertanian Anda.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            {[
              { icon: "📞", title: "Telepon", content: <a href={`tel:${CONTACT_INFO.phone}`} className="text-sm text-[#6B6B6B] hover:text-brand-primary">{CONTACT_INFO.phone}</a> },
              { icon: "✉️", title: "Email", content: <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-[#6B6B6B] hover:text-brand-primary">{CONTACT_INFO.email}</a> },
              { icon: "💬", title: "WhatsApp", content: <a href={`https://wa.me/${CONTACT_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 hover:text-green-700">Chat via WhatsApp →</a> },
              { icon: "📍", title: "Alamat", content: <p className="text-sm text-[#6B6B6B] leading-relaxed">{CONTACT_INFO.address}</p> },
              { icon: "🕐", title: "Jam Operasional", content: <p className="text-sm text-[#6B6B6B]">Senin - Jumat: 08:00 - 17:00<br />Sabtu: 08:00 - 13:00</p> },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-brand-dark text-sm mb-1">{item.title}</h3>
                  {item.content}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
