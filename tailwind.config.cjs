/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["pastel"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
