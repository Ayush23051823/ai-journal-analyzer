import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import defaultTheme from "tailwindcss/defaultTheme";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // 👇 This is the important part
      "/api": "http://localhost:3001",
    },
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Add 'Inter' as the primary sans-serif font
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          950: "#0d111c",
        },
      },
      boxShadow: {
        glow: "0 0 15px 0 rgba(0, 0, 0, 0.3)",
        "glow-teal": "0 0 15px 0 var(--tw-shadow-color)",
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
