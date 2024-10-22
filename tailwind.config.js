/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      animation: {
        blink: 'blink 2s forwards', // Slow blink that stops
      },
      keyframes: {
        blink: {
          '0%': { opacity: '0', color: 'rgba(34, 197, 94, 0.5)' }, // Start as a faded green
          '50%': { opacity: '1', color: 'rgba(34, 197, 94, 0.5)' }, // Fully visible faded green
          '100%': { opacity: '1', color: 'rgba(34, 197, 94, 1)' },   // Solid green
        },
      },
    },
  },
  plugins: [],
};