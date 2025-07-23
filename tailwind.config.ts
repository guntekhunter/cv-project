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
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      maxWidth: {
        "text-xs": "20ch", // very narrow
        "text-sm": "35ch", // typical for small columns
        "text-md": "45ch", // optimal line length
        "text-lg": "60ch", // slightly wider
        "text-xl": "75ch", // wide
      },
      safelist: [
        "py-[0.4rem]",
        "px-[1.5rem]", // if you're using custom px too
      ],
    },
  },
  plugins: [],
} satisfies Config;
