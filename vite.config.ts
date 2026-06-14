import { paraglideVitePlugin } from "@inlang/paraglide-js";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import devServer from "@hono/vite-dev-server";

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
    devServer({
      entry: "src/server.ts",
      exclude: [
        /^\/(src|node_modules|@vite|@react-refresh)\/.*/,
        /[.](ts|tsx|js|jsx|css)$/
      ]
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
