import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/alvathia/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Alváthia — Entre Cantos y Coronas',
        short_name: 'Alváthia',
        description: 'Codex del universo de Alváthia',
        theme_color: '#080810',
        background_color: '#080810',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/alvathia/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,woff2}']
      }
    })
  ]
})
