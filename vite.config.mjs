import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Safe Vite config for React apps deployed on Vercel
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // set true only for debugging
    chunkSizeWarningLimit: 7000, // ~7 MB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 🧩 Group all React-related libraries together
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom')
            ) {
              return 'vendor-react';
            }

            // ⚙️ Group large libraries into dedicated chunks
            if (id.includes('@tensorflow/tfjs')) return 'vendor-tfjs';
            if (id.includes('three') || id.includes('@react-three')) return 'vendor-three';
            if (id.includes('@babylonjs')) return 'vendor-babylon';
            if (id.includes('p5')) return 'vendor-p5';
            if (id.includes('mathjs')) return 'vendor-mathjs';

            // Default vendor chunk
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    port: 5174, // local dev port (optional)
  },
});
