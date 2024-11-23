import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Bind to all network interfaces (0.0.0.0)
    port: 80,    // Run on port 80 inside the container
  },
})
