/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'desktop': '1024px',
      // => @media (min-width: 1024px) { ... }
    },
    extend: {
      backgroundImage: {
        'plant': "url('/src/assets/plant.png')",
      },
      colors: {
        white: '#ececec'
      }
    },
  },
  plugins: [],
}

