/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#07583F",
        darkBlue: "#064530",
        lightBlue: "#DDF3E9",
        softBlue: "#F1F8F4",
        softGreen: "#E8F5EE",
        lightGreen: "#CDEBDD",
        bg: "#F7F9FC",
        textPrimary: "#0B1220",
        textSecondary: "#4B5563",
        border: "#DDE7F5",
        success: "#16845B",
        warning: "#F59E0B",
        danger: "#DC2626",
      },
      boxShadow: {
        card: "0 20px 45px rgba(10, 31, 77, 0.12)",
      },
      borderRadius: {
        xl: "18px",
        "2xl": "22px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
