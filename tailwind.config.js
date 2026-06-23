/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        detectivePrimary: '#F2C94C', // Playful yellow
        detectiveSecondary: '#F2994A', // Orange
        detectiveDark: '#2D3748', // Dark grey for text
        detectiveLight: '#F7FAFC', // Off white
        detectiveBlue: '#2F80ED',
        detectiveGreen: '#27AE60',
      },
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
