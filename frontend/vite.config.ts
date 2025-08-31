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
      external: [
        'jsvectormap/dist/maps/spain.js',
        'jsvectormap/dist/maps/usa.js',
        'jsvectormap/dist/maps/world.js',
        'jsvectormap/dist/maps/italy.js',
        'jsvectormap/dist/maps/russia.js',
        'jsvectormap/dist/maps/canada.js',
        'jsvectormap/dist/maps/iraq.js',
        'jsvectormap/dist/maps/us-merc-en',
        'jsvectormap/dist/css/jsvectormap.css'
      ],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
