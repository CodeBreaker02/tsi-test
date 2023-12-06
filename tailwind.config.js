/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#FFCA05",
      },
      fontFamily: {
        sans: ["var(--clash-display-font)"],
      },
      fontSize: {
        "2xs": ".65rem",
      },
    },
  },
  plugins: [],
};
