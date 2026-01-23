/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#020617',
        card: 'rgba(30, 41, 59, 0.7)',
        primary: '#38bdf8',
        secondary: '#818cf8',
        accent: '#2dd4bf',
      }
    },
  },
  plugins: [],
}