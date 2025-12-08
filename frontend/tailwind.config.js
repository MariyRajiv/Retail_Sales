/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  safelist: [
    'text-tru-badge',
    'hover:text-tru-badge',
    'bg-hover-bg',
    'scale-101',
    'animate-fadeInUp'
  ],
  theme: {
    extend: {
      colors: {
        'tru-navy': '#083b66',
        'tru-badge': '#0d6ea8',
        'page-bg': '#f5f7f9',
        'card-bg': '#ffffff',
        'hover-bg': '#e0f2fe',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
      },
      scale: {
        '101': '1.01',
      },
    },
  },
  plugins: [],
}
