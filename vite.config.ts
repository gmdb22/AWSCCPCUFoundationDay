import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/AWSCCPCUFoundationDay/',
  build: {
    rollupOptions: {
      input: './index.html'
    }
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
  },
  optimizeDeps: {
    entries: ['./src/main.tsx']
  }
})
