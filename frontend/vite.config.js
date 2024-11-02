import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: '0.0.0.0',
    proxy:{
      '/api':{
        target: 'http://34.197.94.125:5000',
      }
    }
  }
})
