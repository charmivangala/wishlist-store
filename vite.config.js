import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: change '/wishlist-store/' below to '/<your-repo-name>/'
// This must match the exact name of your GitHub repository for GitHub Pages to work.
export default defineConfig({
  plugins: [react()],
  base: '/wishlist-store/',
})
