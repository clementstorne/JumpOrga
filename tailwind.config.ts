import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      minsk: {
        DEFAULT: "#47297B",
        50: "#BAA4E1",
        100: "#AE94DC",
        200: "#9776D1",
        300: "#8057C7",
        400: "#6A3DB8",
        500: "#59339A",
        600: "#47297B",
        700: "#351F5C",
        800: "#24153E",
        900: "#120A1F",
        950: "#090510",
      },
      casablanca: {
        DEFAULT: "#F5C348",
        50: "#FFFCF6",
        100: "#FDF6E3",
        200: "#FBE9BC",
        300: "#F9DC95",
        400: "#F7D06F",
        500: "#F5C348",
        600: "#F3B621",
        700: "#DFA20C",
        800: "#B9860A",
        900: "#926A08",
        950: "#7E5C07",
      },
      gray: {
        DEFAULT: "#A0A0A0",
        50: "#FCFCFC",
        100: "#F2F2F2",
        200: "#DDDDDD",
        300: "#C9C9C9",
        400: "#B4B4B4",
        500: "#A0A0A0",
        600: "#7F7F7F",
        700: "#5E5E5E",
        800: "#3D3D3D",
        900: "#1B1B1B",
        950: "#0B0B0B",
      },
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      success: {
        DEFAULT: "hsl(var(--success))",
        foreground: "hsl(var(--success-foreground))",
      },
      warning: {
        DEFAULT: "hsl(var(--warning))",
        foreground: "hsl(var(--warning-foreground))",
      },
      info: {
        DEFAULT: "hsl(var(--info))",
        foreground: "hsl(var(--info-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        auth: "url('/cavaliere-cheval-noir.webp')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
