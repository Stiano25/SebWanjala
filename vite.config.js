import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    // Poll for changes: file edits made outside the editor (e.g. synced or
    // written by tools) don't always fire native watch events on Windows drives.
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
          icons: ['react-icons/si', 'react-icons/di', 'lucide-react'],
        },
      },
    },
  },
})
