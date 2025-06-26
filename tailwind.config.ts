import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      weight: {
        hairline: "14.90",
        thin: "24.11",
        light: "39.01",
        normal: "63.12",
        medium: "102.13",
        semibold: "165.25",
        bold: "267.38",
        extrabold: "432.63",
        black: "700",
      },
    },
  },
  plugins: [],
} satisfies Config;
