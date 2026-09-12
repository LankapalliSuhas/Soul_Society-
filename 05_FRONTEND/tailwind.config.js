/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        oat: "#F7F3EA",
        linen: "#EFE9DC",
        linen2: "#F2ECE0",
        spring: "#DDE9D7",
        leaf: "#71866A",
        leafDeep: "#405443",
        ink: "#29342C",
        inkSoft: "#7B847A",
        border: "#D9DED3",
        borderSoft: "#E4E7DE",
        amber: "#B78B55",
        amberBg: "#F1E6D5",
        rose: "#A76B62",
        roseBg: "#F0E0DC",
        ok: "#71866A",
        okBg: "#E4EAE0",
      },
      fontFamily: {
        display: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "14px",
        xl: "20px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(41,52,39,.04), 0 10px 24px rgba(41,52,39,.04)",
        hero: "0 1px 2px rgba(41,52,39,.04), 0 14px 30px rgba(41,52,39,.06)",
      },
    },
  },
  plugins: [],
};
