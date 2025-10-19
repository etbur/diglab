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
          }
        },
      },
    },
  },
})
