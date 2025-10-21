/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'deep-navy': '#0F1118',
        'electric-teal': '#32C5D2',
        'bright-cyan': '#5BE8EB',
        'warm-gold': '#FFD166',
        'light-gray': '#E6E9EE',
        'pure-white': '#FFFFFF',
        // Secondary / Support Colors
        'slate-gray': '#67718A',
        'soft-blue': '#4A90E2',
        'dark-charcoal': '#1C1F26',
      },
      fontFamily: {
        'cairo': ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}