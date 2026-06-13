import { paraglideVitePlugin } from "@inlang/paraglide-js";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./src/paraglide"
    }),
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true
    }),
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@velite": path.resolve(__dirname, "./.velite")
    }
  }
});
