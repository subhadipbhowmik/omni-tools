/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounceIn: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        typing: {
          "0%": { width: "0" },
          "25%": { width: "25%" },
          "50%": { width: "50%" },
          "75%": { width: "75%" },
          "100%": { width: "100%" },
        },
        blink: {
          "50%": { opacity: "0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
        bounceIn: "bounceIn 0.8s ease-out infinite",
        typing: "typing 2s steps(20, end), blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
