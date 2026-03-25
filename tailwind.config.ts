import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#f3efe6",
        stone: "#ece7dc",
        ink: "#12151c",
        smoke: "#3c4351",
        cobalt: "#1d4ed8",
        ember: "#a13d2d",
        line: "rgba(18, 21, 28, 0.14)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"]
      },
      boxShadow: {
        rule: "0 1px 0 rgba(18, 21, 28, 0.12)"
      },
      maxWidth: {
        measure: "72ch"
      }
    }
  },
  plugins: []
};

export default config;
