import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  build: { manifest: true },
  base: process.env.mode === "production" ? "/static/" : "/",
  plugins: [reactRefresh()],
});