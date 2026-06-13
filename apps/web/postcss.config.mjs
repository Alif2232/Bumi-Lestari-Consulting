// ============================================
// 📁 apps/web/postcss.config.mjs
// ============================================
// Nama       : Konfigurasi PostCSS
// Fungsi     : Memproses CSS dengan plugin Tailwind
// Penjelasan : file .mjs = ES Module (support import/export)
// ============================================

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    // 👆 plugin Tailwind CSS v4 via PostCSS
  },
};

export default config;
