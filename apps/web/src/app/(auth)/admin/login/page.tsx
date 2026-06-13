// ============================================
// 📁 apps/web/src/app/(auth)/admin/login/page.tsx
// ============================================
// Nama       : Halaman Login Admin
// Fungsi     : Form login untuk admin & investor
// Penjelasan : Route group (auth) TIDAK punya layout
//              proteksi, jadi halaman ini bisa diakses
//              tanpa login. Setelah login sukses,
//              redirect ke dashboard /admin
// ============================================

'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau password salah");
        setIsLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-brand-cream to-brand-cream-dark px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌱</div>
          <h1 className="font-serif text-2xl text-brand-dark">Bumi Lestari Consulting</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">Masuk ke dashboard admin</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-black/5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">{error}</div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bumilestari.co.id" required
              className="w-full px-4 py-3 rounded-xl border border-black/10 bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-brand-dark mb-1.5">Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password" required
              className="w-full px-4 py-3 rounded-xl border border-black/10 bg-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all text-sm"
            />
          </div>

          <button
            type="submit" disabled={isLoading}
            className="w-full py-3 bg-brand-primary text-white font-semibold rounded-xl hover:bg-[#2D5A3F] transition-all duration-300 disabled:opacity-60"
          >
            {isLoading ? "⏳ Memproses..." : "🔐 Masuk"}
          </button>
        </form>

        <p className="text-xs text-[#9A9A9A] text-center mt-6">
          Hanya untuk admin & investor Bumi Lestari Consulting
        </p>
      </div>
    </div>
  );
}
