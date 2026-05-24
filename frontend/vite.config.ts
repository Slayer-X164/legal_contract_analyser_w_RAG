import { defaultAllowedOrigins, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [tailwindcss(), tanstackRouter(), react()],
  server: {
    allowedHosts: [
      'amphigenously-lepidopterological-carmon.ngrok-free.dev'
    ]
  }
})