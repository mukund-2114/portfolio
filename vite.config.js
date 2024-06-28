import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    rewrite: ({ path }) => {
      if (!path.startsWith('/static/')) {
        return '/index.html';
      }
      return null;
    },
  },
})
