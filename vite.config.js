
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Raise the warning limit since some vendor libs are legitimately heavy
    chunkSizeWarningLimit: 7000, // in kB (~7 MB)
    rollupOptions: {
      output: {
        // Force-split heavy libraries into dedicated vendor chunks
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@tensorflow/tfjs')) return 'vendor-tfjs'
            if (id.includes('three') || id.includes('@react-three')) return 'vendor-three'
            if (id.includes('@babylonjs')) return 'vendor-babylon'
            if (id.includes('p5')) return 'vendor-p5'
            if (id.includes('mathjs')) return 'vendor-mathjs'
            if (id.includes('react-router')) return 'vendor-react-router'
            if (id.includes('react')) return 'vendor-react'

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

  },
})

    chunkSizeWarningLimit: 2000, // optional: silence warnings up to 2MB
  },
});

