import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
