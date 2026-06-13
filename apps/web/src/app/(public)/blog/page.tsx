// ============================================
// 📁 apps/web/src/app/(public)/blog/page.tsx
// ============================================
// Nama       : Halaman Blog / Insight
// Fungsi     : Menampilkan daftar artikel, berita, dan
//              wawasan (insight) seputar pertanian
// Penjelasan : Blog untuk membangun otoritas (authority)
//              di bidang pertanian. Artikel bisa diisi
//              dengan tips, studi kasus, analisis tren,
//              dan berita perusahaan. Untuk MVP, pakai
//              data dummy yang nanti bisa diganti dengan
//              CMS atau MDX
// ============================================

'use client';
import { useEffect } from "react";
import Link from "next/link";

// 👇 Data dummy artikel blog — nanti bisa diganti dari CMS
const BLOG_POSTS = [
  {
    id: 1,
    emoji: "🌾",
    category: "Tips & Trik",
    title: "5 Cara Meningkatkan Produktivitas Padi di Musim Kemarau",
    excerpt: "Temukan teknik pengelolaan air dan pemilihan varietas padi yang tepat untuk tetap produktif di musim kemarau.",
    date: "12 Juni 2026",
    readTime: "5 menit",
    author: "Ir. Hadi Prasetyo",
  },
  {
    id: 2,
    emoji: "🌽",
    category: "Studi Kasus",
    title: "Keberhasilan Program Jagung Terintegrasi di NTB",
    excerpt: "Bagaimana Bumi Lestari menghubungkan 1.500 petani jagung dengan industri pakan ternak di Nusa Tenggara Barat.",
    date: "28 Mei 2026",
    readTime: "8 menit",
    author: "Tim Bumi Lestari",
  },
  {
    id: 3,
    emoji: "📊",
    category: "Analisis",
    title: "Tren Investasi Agribisnis 2026: Peluang & Tantangan",
    excerpt: "Analisis mendalam tentang sektor agribisnis yang menjadi primadona investasi di tahun 2026.",
    date: "15 Mei 2026",
    readTime: "10 menit",
    author: "Dr. Dewi Sartika",
  },
  {
    id: 4,
    emoji: "🌱",
    category: "Teknologi",
    title: "Pertanian Presisi: Masa Depan Agrikultur Indonesia",
    excerpt: "Mengenal teknologi pertanian presisi dan bagaimana penerapannya bisa meningkatkan efisiensi hingga 40%.",
    date: "2 Mei 2026",
    readTime: "7 menit",
    author: "Tim Riset",
  },
  {
    id: 5,
    emoji: "🤝",
    category: "Berita",
    title: "Bumi Lestari Tandatangani MoU dengan Pemprov Jawa Timur",
    excerpt: "Kerjasama strategis untuk pendampingan 5.000 hektar lahan sawah di 15 kabupaten Jawa Timur.",
    date: "20 April 2026",
    readTime: "4 menit",
    author: "Tim Bumi Lestari",
  },
  {
    id: 6,
    emoji: "🌿",
    category: "Edukasi",
    title: "Panduan Lengkap Pengendalian Hama Ramah Lingkungan",
    excerpt: "Pelajari metode pengendalian hama terpadu (PHT) yang efektif tanpa merusak ekosistem sawah.",
    date: "8 April 2026",
    readTime: "6 menit",
    author: "Ir. Hadi Prasetyo",
  },
];

export default function BlogPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 👇 Warna untuk setiap kategori
  const categoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      "Tips & Trik": "bg-brand-secondary/15 text-[#8B6B2A]",
      "Studi Kasus": "bg-brand-primary/10 text-brand-primary",
      Analisis: "bg-brand-accent/10 text-brand-accent",
      Teknologi: "bg-blue-100 text-blue-700",
      Berita: "bg-purple-100 text-purple-700",
      Edukasi: "bg-green-100 text-green-700",
    };
    return colors[cat] || "bg-gray-100 text-gray-600";
  };

  return (
    <>
      {/* ===== HERO HALAMAN ===== */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-brand-cream to-brand-cream-dark">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-brand-secondary mb-4">
            Insight
          </span>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight text-brand-dark mb-5">
            Wawasan & Artikel<br />
            Pertanian Terkini
          </h1>
          <div className="w-16 h-0.5 bg-brand-secondary mx-auto mb-5" />
          <p className="text-base md:text-lg text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed">
            Tips, analisis, dan berita terbaru seputar dunia pertanian dari
            para ahli Bumi Lestari Consulting.
          </p>
        </div>
      </section>

      {/* ===== GRID ARTIKEL ===== */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="reveal group bg-brand-cream rounded-2xl overflow-hidden border border-black/5 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* 👇 Ilustrasi */}
              <div className="h-44 bg-gradient-to-br from-brand-sage-light to-brand-cream-dark flex items-center justify-center text-6xl">
                {post.emoji}
              </div>

              {/* 👇 Konten */}
              <div className="p-6">
                {/* 👇 Kategori */}
                <span className={`inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full ${categoryColor(post.category)}`}>
                  {post.category}
                </span>

                {/* 👇 Judul */}
                <h3 className="font-serif text-lg text-brand-dark mt-3 mb-2 group-hover:text-brand-primary transition-colors duration-300">
                  {post.title}
                </h3>

                {/* 👇 Excerpt */}
                <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* 👇 Meta: tanggal + waktu baca */}
                <div className="flex items-center justify-between text-xs text-[#9A9A9A]">
                  <span>📅 {post.date}</span>
                  <span>⏱ {post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
