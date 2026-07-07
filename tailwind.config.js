/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#3D2D14',
        cream: '#EFE7D9',   // fond principal — kraft doux (fini le blanc)
        warm: '#E8DCC9',    // sections alternées — un ton plus profond
        surface: '#FAF6F0', // cartes — blanc cassé chaud
        coral: { DEFAULT: '#C86E46', dark: '#8B4513', light: '#F5E6DC' },  // terracotta / rust
        teal: { DEFAULT: '#6B7B3E', dark: '#4F5E2C', light: '#EDF0E6' },   // olive
        gold: { DEFAULT: '#D6A23D', light: '#F9F0DC' },                    // mustard
        sage: '#A4B494',
        english: '#D6A23D',  // mustard
        korean: '#C86E46',   // terracotta
        italian: '#6B7B3E',  // olive
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
