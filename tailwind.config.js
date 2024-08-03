/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        clash: ["Clash Grotesk", "sans-serif"],
        coluna: ["Coluna Rounded", "sans-serif"], // Add this line for custom font
      },
    },
  },
  plugins: [],
};
