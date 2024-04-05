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
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
        9: "9 9 0%",
      },
      keyframes: {
        "slide-left": {
          "0%": {
            " -webkit-transform": " translateX(40px);",
            transform: "translateX(40px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(10px);",
          },
        },
        "slide-left-reverse": {
          "0%": {
            " -webkit-transform": " translateX(40px);",
            transform: "translateX(40px);",
            opacity: "0;",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "slide-bottom": {
          "0%": {
            " -webkit-transform": " translateY(-40px);",
            transform: "translateY(-40px);",
          },
          "100%": {
            "-webkit-transform": "translateY(0);",
            transform: "translateY(0);",
          },
        },
        "slide-bottom-reverse": {
          "0%": {
            " -webkit-transform": " translateY(-40px);",
            transform: "translateY(-40px);",
          },
          "100%": {
            "-webkit-transform": "translateY(0);",
            transform: "translateY(0);",
          },
        },
      },
      animation: {
        "slide-left": "slide-left 0.5s both;",
        "slide-left-reverse": "slide-left-reverse 0.2s reverse both",
        "slide-bottom": "slide-bottom 0.5s both;",
        "slide-bottom-reverse": "slide-bottom 0.2s reverse both;",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
