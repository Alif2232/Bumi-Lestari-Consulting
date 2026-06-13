'use client';

// ============================================
// 📁 apps/web/src/components/forms/ContactForm.tsx
// ============================================
// Nama       : Contact Form Component
// Fungsi     : Form kontak yang terhubung ke API /api/lead
//              — Validasi client-side dengan Zod
//              — Kirim data ke server via fetch
//              — Tampilkan loading, error, success state
// ============================================

import { useState } from "react";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  { value: "konsultasi-lahan", label: "Konsultasi & Analisis Lahan" },
  { value: "manajemen-hama", label: "Manajemen Hama & Penyakit" },
  { value: "pelatihan", label: "Pelatihan & Pendampingan" },
  { value: "program-pemerintah", label: "Pendampingan Program Pemerintah" },
  { value: "audit-lahan", label: "Audit & Evaluasi Lahan" },
  { value: "kemitraan", label: "Kemitraan & Investasi" },
  { value: "lainnya", label: "Lainnya" },
];

const initialForm: ContactFormData = {
  name: "", email: "", phone: "", company: "", service: "konsultasi-lahan", message: "",
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Hapus error field yang diperbaiki
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    if (serverError) setServerError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("submitting");
    setErrors({});
    setFieldErrors({});
    setServerError("");

    // ---- VALIDASI CLIENT-SIDE ----
    const result = contactFormSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      setSubmitState("idle");
      return;
    }

    try {
      // ---- KIRIM KE API ----
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const json = await response.json();

      if (!response.ok) {
        // Handle error dari server
        if (response.status === 400 && json.fields) {
          setFieldErrors(json.fields);
        } else if (response.status === 429) {
          setServerError(json.error || "Terlalu banyak permintaan. Silakan coba beberapa saat lagi.");
        } else {
          setServerError(json.error || "Gagal mengirim pesan. Silakan coba lagi.");
        }
        setSubmitState("error");
        return;
      }

      // ---- SUKSES ----
      console.log("✅ Lead terkirim:", json);
      setSubmitState("success");
      setForm(initialForm);
    } catch (error) {
      // Network error (server down, koneksi terputus, dll)
      console.error("❌ Network error:", error);
      setServerError("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
      setSubmitState("error");
    }
  };

  // ---- STATE: SUKSES ----
  if (submitState === "success") {
    return (
      <div className="bg-brand-sage-light rounded-2xl p-10 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="font-serif text-2xl text-brand-dark mb-3">Pesan Terkirim!</h2>
        <p className="text-[#6B6B6B] mb-6">
          Terima kasih {form.name}! Tim Bumi Lestari akan menghubungi Anda dalam 1x24 jam.
        </p>
        <button
          onClick={() => setSubmitState("idle")}
          className="px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-[#2D5A3F] transition-all"
        >
          Kirim Lagi
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* ---- ERROR BANNER (server error / rate limit) ---- */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {serverError}
        </div>
      )}

      {/* ---- NAMA & EMAIL ---- */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text" name="name" value={form.name} onChange={handleChange}
            placeholder="Masukkan nama Anda"
            className={cn(
              "w-full px-4 py-3 rounded-xl border border-black/10 bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm",
              (errors.name || fieldErrors.name) && "border-red-400 focus:ring-red-200"
            )}
          />
          {(errors.name || fieldErrors.name) && (
            <p className="text-xs text-red-500 mt-1">{errors.name || fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="contoh@email.com"
            className={cn(
              "w-full px-4 py-3 rounded-xl border border-black/10 bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm",
              (errors.email || fieldErrors.email) && "border-red-400 focus:ring-red-200"
            )}
          />
          {(errors.email || fieldErrors.email) && (
            <p className="text-xs text-red-500 mt-1">{errors.email || fieldErrors.email}</p>
          )}
        </div>
      </div>

      {/* ---- WHATSAPP & PERUSAHAAN ---- */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">
            Nomor WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            type="tel" name="phone" value={form.phone} onChange={handleChange}
            placeholder="08123456789"
            className={cn(
              "w-full px-4 py-3 rounded-xl border border-black/10 bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm",
              (errors.phone || fieldErrors.phone) && "border-red-400 focus:ring-red-200"
            )}
          />
          {(errors.phone || fieldErrors.phone) && (
            <p className="text-xs text-red-500 mt-1">{errors.phone || fieldErrors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-1.5">
            Nama Perusahaan <span className="text-gray-400">(opsional)</span>
          </label>
          <input
            type="text" name="company" value={form.company} onChange={handleChange}
            placeholder="Nama perusahaan/instansi"
            className={cn(
              "w-full px-4 py-3 rounded-xl border border-black/10 bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm",
              fieldErrors.company && "border-red-400 focus:ring-red-200"
            )}
          />
          {fieldErrors.company && (
            <p className="text-xs text-red-500 mt-1">{fieldErrors.company}</p>
          )}
        </div>
      </div>

      {/* ---- LAYANAN ---- */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-1.5">
          Layanan yang Diminati <span className="text-red-500">*</span>
        </label>
        <select
          name="service" value={form.service} onChange={handleChange}
          className={cn(
            "w-full px-4 py-3 rounded-xl border border-black/10 bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm appearance-none",
            (errors.service || fieldErrors.service) && "border-red-400 focus:ring-red-200"
          )}
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {(errors.service || fieldErrors.service) && (
          <p className="text-xs text-red-500 mt-1">{errors.service || fieldErrors.service}</p>
        )}
      </div>

      {/* ---- PESAN ---- */}
      <div>
        <label className="block text-sm font-semibold text-brand-dark mb-1.5">
          Pesan <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message" value={form.message} onChange={handleChange}
          rows={5} placeholder="Jelaskan kebutuhan konsultasi pertanian Anda..."
          className={cn(
            "w-full px-4 py-3 rounded-xl border border-black/10 bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm resize-y",
            (errors.message || fieldErrors.message) && "border-red-400 focus:ring-red-200"
          )}
        />
        {(errors.message || fieldErrors.message) && (
          <p className="text-xs text-red-500 mt-1">{errors.message || fieldErrors.message}</p>
        )}
      </div>

      {/* ---- SUBMIT BUTTON ---- */}
      <button
        type="submit"
        disabled={submitState === "submitting"}
        className={cn(
          "w-full py-3.5 bg-brand-primary text-white font-semibold rounded-xl transition-all duration-300 hover:bg-[#2D5A3F] hover:shadow-lg hover:shadow-brand-primary/30",
          submitState === "submitting" && "opacity-60 cursor-not-allowed"
        )}
      >
        {submitState === "submitting" ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Mengirim...
          </span>
        ) : submitState === "error" ? (
          "🔄 Coba Lagi"
        ) : (
          "📨 Kirim Pesan"
        )}
      </button>

      <p className="text-xs text-[#9A9A9A] text-center">
        Data Anda akan diproses sesuai dengan UU Perlindungan Data Pribadi.
      </p>
    </form>
  );
}
