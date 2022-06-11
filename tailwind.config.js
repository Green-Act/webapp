/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      colors: {
        gat: {
          green: "#00BF08",
          gray: "#D9D9D9",
        },
      },
    },
  },
  plugins: [],
};
