/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./admin/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins, sans-serif",
        urbanist: "Urbanist, sans-serif",
        bruno: "Bruno Ace SC, sans-serif",
        gochiHand: "Gochi Hand, cursive",
      },
      colors: {
        stayPurple: "#ab6ec5",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
