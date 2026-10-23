import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#F4F5F7",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          recessed: "#EAECEF",
        },
        hairline: {
          DEFAULT: "#DDE1E7",
          strong: "#111315",
        },
        ink: {
          primary: "#111315",
          secondary: "#5A6065",
          tertiary: "#686F76",
        },
        signal: {
          orange: "#FF4F00",
          "orange-ink": "#B83A00",
          "orange-hover": "#E04500",
        },
        blueprint: {
          blue: "#0047FF",
          subtle: "rgba(0, 71, 255, 0.06)",
        },
        status: {
          emerald: "#107C41",
          "emerald-subtle": "rgba(16, 124, 65, 0.12)",
        },
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.035em",
        tighter: "-0.02em",
        tight: "-0.01em",
        widest: "0.12em",
        mono: "0.08em",
      },
      boxShadow: {
        tactile: "0 1px 2px rgba(17, 19, 21, 0.04)",
        "tactile-hover": "0 2px 4px rgba(17, 19, 21, 0.06)",
        drawer: "0 -4px 24px rgba(17, 19, 21, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
