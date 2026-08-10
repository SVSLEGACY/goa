/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./generator.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'residency-bg': '#fdf8f0',
        'residency-dark': '#0a2e1f',
        'residency-yellow': '#fbe36a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
