/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        main: "1220px",
      },
      fontFamily: {
        serif: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
