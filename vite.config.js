import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^@mui\/system$/,
        replacement: new URL('./src/shims/mui-system.js', import.meta.url).pathname,
      },
    ],
  },
  server: {
    port: 3000,

    proxy: {
      '/api': {
        target: 'http://api.electro.local',
        changeOrigin: true,
      },
    },
  },
})
