import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: "bundle-report.html", // shows bundle breakdown
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react";
            if (id.includes("react-dom")) return "react-dom";
            if (id.includes("three")) return "three";
            if (id.includes("@babylonjs")) return "babylon";
            if (id.includes("@tensorflow")) return "tensorflow";
            if (id.includes("mathjs")) return "mathjs";
            if (id.includes("p5")) return "p5";
            return "vendor"; // all other smaller libs
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000, // optional: silence warnings up to 2MB
  },
});
