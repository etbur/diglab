import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 7000, // ~7 MB
    rollupOptions: {
      output: {
        // Safe vendor chunking
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Separate heavy libraries into their own chunks
            if (id.includes('@tensorflow/tfjs')) return 'vendor-tfjs';
            if (id.includes('three') || id.includes('@react-three')) return 'vendor-three';
            if (id.includes('@babylonjs')) return 'vendor-babylon';
            if (id.includes('p5')) return 'vendor-p5';
            if (id.includes('mathjs')) return 'vendor-mathjs';
            if (id.includes('react-router-dom')) return 'vendor-react-router';
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            return 'vendor';
          }
        },
      },
    },
  },
});
