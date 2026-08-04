/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // デザイントークンは src/styles/global.css の CSS 変数を唯一の原典とし、
        // Tailwind からは var() 参照で使う（値の二重管理を避ける）。
        ink: {
          900: 'var(--ink-900)',
          800: 'var(--ink-800)',
          700: 'var(--ink-700)',
          600: 'var(--ink-600)',
        },
        gray: {
          500: 'var(--gray-500)',
          400: 'var(--gray-400)',
          300: 'var(--gray-300)',
          200: 'var(--gray-200)',
        },
        paper: 'var(--paper)',
        vermillion: {
          DEFAULT: 'var(--vermillion)',
          light: 'var(--vermillion-light)',
        },
      },
      fontFamily: {
        // 実体は global.css の CSS 変数で言語別に切り替える
        serifJa: 'var(--font-serif-ja)',
        sansJa: 'var(--font-sans-ja)',
        label: 'var(--font-label)',
      },
      maxWidth: {
        content: '1240px',
        prose: '820px',
      },
    },
  },
  plugins: [],
};
