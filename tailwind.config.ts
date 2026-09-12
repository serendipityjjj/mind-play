import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xs':   ['0.875rem',  { lineHeight: '1.6' }],   // 14px (was 12px)
        'sm':   ['1rem',      { lineHeight: '1.6' }],   // 16px (was 14px)
        'base': ['1.125rem',  { lineHeight: '1.65' }],  // 18px (was 16px)
        'lg':   ['1.25rem',   { lineHeight: '1.65' }],  // 20px (was 18px)
        'xl':   ['1.5rem',    { lineHeight: '1.5' }],   // 24px (was 20px)
        '2xl':  ['1.75rem',   { lineHeight: '1.4' }],   // 28px (was 24px)
        '3xl':  ['2.125rem',  { lineHeight: '1.35' }],  // 34px (was 30px)
        '4xl':  ['2.5rem',    { lineHeight: '1.3' }],   // 40px (was 36px)
      },
      colors: {
        deepgreen: {
          DEFAULT: "#2A784B",
          hover: "#21633D",
          light: "#EEF6F0",
          border: "#A5D6B6",
        },
        rosepink: {
          DEFAULT: "#C44D62",
          hover: "#A83C50",
          light: "#FCEDF0",
          border: "#F5B8C4",
        },
        skyblue: {
          DEFAULT: "#1E88E5",
          hover: "#1565C0",
          light: "#EBF6FC",
          border: "#90CAF9",
        },
        deeppurple: {
          DEFAULT: "#5B4B8A",
          hover: "#45386B",
          light: "#F3EFF8",
          border: "#CEBFE6",
        },
        paper: {
          DEFAULT: "#FAF6F0",
          dark: "#EFE8DC",
          lines: "#E4DBCB",
        }
      },
      fontFamily: {
        title: ["GangwonEduModu", "Do Hyeon", "sans-serif"],
        badge: ["GangwonEduModuLight", "Jua", "sans-serif"],
        novel: ["GangwonEduSaeum", "Gaegu", "cursive"],
        hand: ["KyoboHandwriting2019", "Gaegu", "cursive"],
        sans: ["Pretendard Variable", "Pretendard", "sans-serif"],
      },
      boxShadow: {
        ticket: "0 4px 15px -3px rgba(42, 120, 75, 0.15), 0 2px 6px -2px rgba(42, 120, 75, 0.1)",
        soft: "0 8px 30px rgba(0, 0, 0, 0.06)",
        book: "0 20px 40px rgba(70, 50, 30, 0.15), 0 0 10px rgba(0, 0, 0, 0.05)",
      },
      backgroundImage: {
        "radial-main": "radial-gradient(circle at top, #FAF5F7 0%, #F5F7FA 100%)",
        "spring-pattern": "repeating-linear-gradient(90deg, #E5E7EB, #E5E7EB 12px, #9CA3AF 12px, #9CA3AF 14px)",
      },
      animation: {
        "float-slow": "float 4s ease-in-out infinite",
        "pulse-gentle": "pulseGentle 2.5s ease-in-out infinite",
        "envelope-open": "envelopeOpen 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseGentle: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.03)", opacity: "0.9" },
        },
        envelopeOpen: {
          "0%": { transform: "scaleY(1)", opacity: "1" },
          "100%": { transform: "scaleY(0)", opacity: "0" },
        },
      }
    },
  },
  plugins: [],
};

export default config;
