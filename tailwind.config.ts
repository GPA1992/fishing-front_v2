import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        surfaceMuted: "hsl(var(--surfaceMuted))",
        border: "hsl(var(--border))",
        text: "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          Strong: "hsl(var(--primaryStrong))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          Strong: "hsl(var(--accentStrong))",
        },
        highlight: "hsl(var(--highlight))",
        gradient: {
          DEFAULT: "hsl(var(--gradient))",
          1: "hsl(var(--gradient-1))",
          2: "hsl(var(--gradient-2))",
          3: "hsl(var(--gradient-3))",
        },
      },
    },
  },
  plugins: [],
};

export default config;
