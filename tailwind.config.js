/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A1F4D",
        darkBlue: "#08152F",
        lightBlue: "#EAF1FF",
        softBlue: "#F4F8FF",
        bg: "#F7F9FC",
        textPrimary: "#0B1220",
        textSecondary: "#4B5563",
        border: "#DDE7F5",
        success: "#0F5BFF",
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
