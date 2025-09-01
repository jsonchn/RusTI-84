import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/RusTI-84/", // GitHub Pages subpath
  optimizeDeps: {
    include: [
      "@rusti-84/context",
      "@rusti-84/data",
      "@rusti-84/images",
      "@emotion/styled",
      "@mui/material",
    ],
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
