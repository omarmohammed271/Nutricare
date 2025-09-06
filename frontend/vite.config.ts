import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve("./src"),
      "@": path.resolve("./"),
    },
  },
  optimizeDeps: {
    include: ['jsvectormap'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          maps: ['jsvectormap'],
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
