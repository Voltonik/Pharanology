import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  build: { manifest: true },
  base: process.env.mode === "production" ? "/static/" : "/",
  root: "./src",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@sections": path.resolve(__dirname, "./src/sections"),
      "@bootstrap": path.resolve(__dirname, "./node_modules/bootstrap"),
    },
  },
  plugins: [reactRefresh()],
});
