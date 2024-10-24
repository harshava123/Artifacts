/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        oleo: ['"Oleo Script"', 'cursive'], // Adding Oleo Script as a custom font
      },
      gradientColorStops: (theme) => ({
        "orange-400": "#F6B93B", // Example color
        "orange-600": "#D97319", // Example color
      }),
      colors: {
        customOrange: "#ff8c00", // Custom orange color
      },
      animation: {
        blink: "blink 2s forwards", // Slow blink that stops
      },
      keyframes: {
        blink: {
          "0%": { opacity: "0", color: "rgba(34, 197, 94, 0.5)" }, // Start as a faded green
          "50%": { opacity: "1", color: "rgba(34, 197, 94, 0.5)" }, // Fully visible faded green
          "100%": { opacity: "1", color: "rgba(34, 197, 94, 1)" }, // Solid green
        },
      },
      // Add custom input styles
      borderRadius: {
        'curvy': '30px', // Add a custom border radius
      },
      transitionProperty: {
        'input': 'border, box-shadow', // Add custom transition properties for input fields
      },
    },
  },
  variants: {
    gradientColorStops: ["responsive", "hover", "focus"],
  },
  plugins: [],
};
