/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B132B',
          800: '#1C2541',
          700: '#3A506B',
        },
        suraksha: {
          green: '#10B981',
          amber: '#F59E0B',
          red: '#EF4444',
          blue: '#1E40AF',
        }
      }
    },
  },
  plugins: [],
}
