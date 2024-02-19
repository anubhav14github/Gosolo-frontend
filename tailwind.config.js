/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'backg':'#e0f2f1',
        'primary': '#64b5f6',
        'secondary': '#1e88e5',
        'tertiary': '#0d47a1',
      },
      fontFamily: {
      },
      screens: {
        'xs': '320px',
      },
    },
  },
  plugins: [],
}