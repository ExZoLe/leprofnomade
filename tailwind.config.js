/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1A1A2E',
        cream: '#FAFAF5',
        warm: '#F5F3EE',
        coral: { DEFAULT: '#E8553D', dark: '#C9412D', light: '#FEF2F0' },
        teal: { DEFAULT: '#2A9D8F', dark: '#1F7A6F', light: '#ECFDF5' },
        gold: { DEFAULT: '#E9C46A', light: '#FFFBEB' },
        english: '#1B4965',
        korean: '#8338EC',
        italian: '#E63946',
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
