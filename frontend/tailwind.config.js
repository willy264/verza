/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          primary: "#22C55E",
          secondary: "#00D492",
          dark: "#16A34A",
        },
      },
      fontFamily: {
        goldman: ["Goldman", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
        codsytar: ["Codsytar", "monospace"],
      },
      backgroundImage: {
        "gradient-green": "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
        "gradient-green-light":
          "linear-gradient(135deg, #22C55E 0%, #00D492 100%)",
      },
      boxShadow: {
        "glow-green": "0 0 20px rgba(34, 197, 94, 0.5)",
        "glow-green-lg": "0 0 40px rgba(34, 197, 94, 0.3)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(34, 197, 94, 0.8)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
