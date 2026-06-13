import Link from "next/link";
import { notFound } from "next/navigation";

const BLOG_POSTS = [
  { id: 1, emoji: "🌾", category: "Tips & Trik", title: "5 Cara Meningkatkan Produktivitas Padi di Musim Kemarau", content: "Musim kemarau sering menjadi tantangan bagi petani padi. Namun dengan teknik yang tepat, produktivitas tetap bisa dijaga.\n\n## 1. Pilih Varietas Tahan Kekeringan\nVarietas seperti Inpari 42 dan Situ Patenggang terbukti tahan terhadap cekaman kekeringan. Biji padi tetap bisa berisi meskipun pasokan air terbatas.\n\n## 2. Atur Sistem Irigasi Berselang\nTeknik irigasi berselang (intermittent irrigation) menghemat air hingga 30% tanpa mengurangi hasil panen. Rendam sawah selama 3 hari, lalu keringkan 5 hari.\n\n## 3. Gunakan Mulsa Organik\nJerami sebagai mulsa membantu menjaga kelembaban tanah dan menekan pertumbuhan gulma. Suhu tanah juga lebih stabil.\n\n## 4. Pemupukan Tepat Waktu\nSaat musim kemarau, pupuk NPK dosis 250 kg/ha dianjurkan. Jangan berlebihan karena bisa membakar akar.\n\n## 5. Pantau Hama Lebih Intensif\nMusim kemarau justru meningkatkan risiko wereng dan tungro. Lakukan monitoring rutin setiap 3 hari sekali.", date: "12 Juni 2026", readTime: "5 menit", author: "Ir. Hadi Prasetyo", avatar: "👨‍🔬" },
  { id: 2, emoji: "🌽", category: "Studi Kasus", title: "Keberhasilan Program Jagung Terintegrasi di NTB", content: "Program jagung terintegrasi di Nusa Tenggara Barat berhasil menjadi model agribisnis yang menguntungkan semua pihak.\n\n## Latar Belakang\nNusa Tenggara Barat memiliki potensi lahan jagung seluas 200.000 hektar. Namun petani sering kesulitan menjual hasil panen dengan harga yang layak.\n\n## Solusi\nBumi Lestari menjembatani 1.500 petani jagung dengan 3 pabrik pakan ternak di wilayah NTB. Kami membantu:\n- Standarisasi kualitas jagung\n- Jadwal tanam yang terkoordinasi\n- Harga dasar yang disepakati\n\n## Hasil\nProduksi mencapai 45.000 ton per tahun dengan harga 20% di atas harga pasar. Petani mendapat kepastian pasar, pabrik mendapat pasokan stabil.", date: "28 Mei 2026", readTime: "8 menit", author: "Tim Bumi Lestari", avatar: "👥" },
  { id: 3, emoji: "📊", category: "Analisis", title: "Tren Investasi Agribisnis 2026", content: "Sektor agribisnis diprediksi menjadi primadona investasi di tahun 2026. Ini analisis lengkapnya.\n\n## Pertumbuhan Sektor\nSektor pertanian tumbuh 3,5% di tahun 2025 dan diprediksi meningkat menjadi 4,2% di 2026. Didorong oleh program ketahanan pangan nasional.\n\n## Sektor yang Menjanjikan\n1. **Hortikultura** — permintaan buah dan sayur organik naik 25%/tahun\n2. **Peternakan Terpadu** — integrasi sawit-sapi, jagung-ayam\n3. **Agritech** — startup pertanian digital menarik minat VC\n\n## Rekomendasi Investor\nInvestasi di sektor hilir (pengolahan) memberikan margin lebih besar daripada sektor hulu (budidaya).", date: "15 Mei 2026", readTime: "10 menit", author: "Dr. Dewi Sartika", avatar: "👩‍🔬" },
  { id: 4, emoji: "🌱", category: "Teknologi", title: "Pertanian Presisi: Masa Depan Agrikultur Indonesia", content: "Pertanian presisi (precision agriculture) adalah pendekatan yang menggunakan teknologi untuk mengoptimalkan input pertanian.\n\n## Apa Itu Pertanian Presisi?\nPertanian presisi menggunakan data dari sensor, drone, dan satelit untuk memberikan perlakuan yang tepat — jumlah air, pupuk, pestisida — sesuai kebutuhan spesifik setiap titik lahan.\n\n## Manfaat\n- **Efisiensi input** — pupuk dan air bisa hemat 30-40%\n- **Hasil meningkat** — produktivitas naik 15-25%\n- **Lingkungan** — mengurangi limbah kimia ke lingkungan\n\n## Penerapan di Indonesia\nBeberapa perusahaan sudah mulai mengadopsi teknologi ini, terutama di perkebunan sawit dan tebu. Biaya awal memang tinggi, tapi ROI dalam 2-3 tahun.", date: "2 Mei 2026", readTime: "7 menit", author: "Tim Riset", avatar: "🔬" },
  { id: 5, emoji: "🤝", category: "Berita", title: "Bumi Lestari Tandatangani MoU dengan Pemprov Jawa Timur", content: "Bumi Lestari Consulting resmi menandatangani Nota Kesepahaman dengan Pemerintah Provinsi Jawa Timur.\n\n## Isi Kerjasama\nMoU ini mencakup pendampingan teknis untuk 5.000 hektar lahan sawah di 15 kabupaten di Jawa Timur. Program akan berjalan selama 3 tahun (2026-2028).\n\n## Target\n- Meningkatkan produktivitas padi dari rata-rata 4,5 ton/ha menjadi 7 ton/ha\n- Membina 3.000 petani dalam budidaya padi modern\n- Mengurangi kehilangan hasil panen (post-harvest loss) sebesar 15%\n\nIni adalah proyek pemerintah daerah terbesar yang pernah kami tangani.", date: "20 April 2026", readTime: "4 menit", author: "Tim Bumi Lestari", avatar: "👥" },
  { id: 6, emoji: "🌿", category: "Edukasi", title: "Panduan Pengendalian Hama Ramah Lingkungan", content: "Pengendalian Hama Terpadu (PHT) adalah pendekatan yang efektif dan ramah lingkungan.\n\n## Prinsip PHT\n1. **Budidaya sehat** — tanaman yang sehat lebih tahan hama\n2. **Pelestarian musuh alami** — predator alami seperti laba-laba, capung, dan burung\n3. **Monitoring rutin** — amati tanaman setiap minggu\n4. **Pengendalian bijak** — pestisida sebagai pilihan terakhir\n\n## Praktik Sederhana\n- Tanam refugia (bunga-bungaan) di pematang sawah untuk menarik musuh alami\n- Pasang lampu perangkap untuk hama wereng\n- Gunakan pestisida nabati dari daun mimba dan sereh\n\nHasilnya: biaya produksi turun 25%, lingkungan tetap sehat.", date: "8 April 2026", readTime: "6 menit", author: "Ir. Hadi Prasetyo", avatar: "👨‍🔬" },
];

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = BLOG_POSTS.find((p) => p.id === Number(id));

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-brand-cream to-brand-cream-dark">
        <div className="max-w-[800px] mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-[#6B6B6B] hover:text-brand-primary transition-colors mb-6">
            ← Kembali ke Blog
          </Link>
          
          <span className="inline-block px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-brand-secondary/15 text-[#8B6B2A] mb-4">
            {post.category}
          </span>

          <h1 className="font-serif text-3xl md:text-5xl leading-tight text-brand-dark mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-[#6B6B6B] mb-8">
            <div className="flex items-center gap-2">
              <span className="text-lg">{post.avatar}</span>
              <span>{post.author}</span>
            </div>
            <span>•</span>
            <span>📅 {post.date}</span>
            <span>•</span>
            <span>⏱ {post.readTime}</span>
          </div>
        </div>
      </section>

      <article className="py-16 md:py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-8xl text-center mb-10">{post.emoji}</div>
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-dark prose-p:text-[#3C3C3C] prose-p:leading-relaxed prose-strong:text-brand-dark prose-li:text-[#3C3C3C]">
            {post.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return <h2 key={i} className="font-serif text-2xl text-brand-dark mt-10 mb-4">{paragraph.replace("## ", "")}</h2>;
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").map((item) => item.replace("- ", ""));
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2 mb-6 text-[#3C3C3C]">
                    {items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                );
              }
              return <p key={i} className="mb-6 text-[#3C3C3C] leading-relaxed">{paragraph}</p>;
            })}
          </div>
        </div>
      </article>

      <section className="py-16 bg-brand-cream text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="font-serif text-2xl md:text-3xl text-brand-dark mb-4">Artikel Terkait</h2>
          <p className="text-[#6B6B6B] mb-8">Baca artikel menarik lainnya dari Bumi Lestari.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-[#2D5A3F] transition-all">
            📚 Lihat Semua Artikel →
          </Link>
        </div>
      </section>
    </>
  );
}
