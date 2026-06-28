/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1A2F24', // Deep green
          primary: '#2C4C3B', // Emerald/Forest
          light: '#E8EFEA', // Light green tint
          gold: '#C5A059', // Elegant gold
          sand: '#F5F2EB', // Warm off-white background
          text: '#333333',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}