import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "JavaScript Full-Stack Wizard Repository",
        short_name: "JS-FSWizPepro",
        description: "JavaScript, React, Vite and Progressive Web Application (PWA) for better performance.",
        background_color: '#225ca3',
        theme_color: '#225ca3',
        id: "/",
        start_url: "/",
        publicPath: '/',
        icons: [
          {
              src: "./logo-96x96.png",
              sizes: "96x96",
              type: "image/png",
              purpose: 'any'
          },
          {
              src: "./logo-128x128.png",
              sizes: "128x128",
              type: "image/png",
              purpose: 'any'
          },
          {
              src: "./logo-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: 'any'
          },
          {
              src: "./logo-256x256.png",
              sizes: "256x256",
              type: "image/png",
              purpose: 'any'
          },
          {
              src: "./logo-384x384.png",
              sizes: "384x384",
              type: "image/png"
          },
          {
            src: './logo-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
        ],
        screenshots : [
          {
            src: "./install-icon-1611x844.png",
            type: "image/png",
            sizes: "1611x844",
            form_factor: "wide"
          },
          {
              src: "./install-icon-1100x980.png",
              type: "image/png",
              sizes: "1100x980",
              form_factor: "narrow"
          },
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,pdf}"],
        runtimeCaching: [{
            urlPattern: ({ url }) => {
                return url.pathname.startsWith("/api");
            },
            handler: "CacheFirst",
            options: {
                cacheName: "api-cache",
                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        }],
      },
      devOptions: {
          enabled: true
      },
    }),
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
