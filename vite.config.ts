import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['images/apple-touch-icon.png'],
          manifest: {
            name: 'Kidrise 望遠鏡探秘',
            short_name: 'Kidrise 望遠鏡',
            description: '香港實時星圖、觀星建議與望遠鏡使用教學',
            lang: 'zh-HK',
            start_url: '/',
            scope: '/',
            display: 'standalone',
            background_color: '#0f172a',
            theme_color: '#0f172a',
            icons: [
              { src: '/images/pwa-192.png', sizes: '192x192', type: 'image/png' },
              { src: '/images/pwa-512.png', sizes: '512x512', type: 'image/png' },
            ],
          },
          workbox: {
            cleanupOutdatedCaches: true,
            navigateFallback: 'index.html',
            globPatterns: ['**/*.{js,css,html,svg,webp,woff2}'],
            globIgnores: ['planisphere/STARMAP_URBAN_*.svg', 'planisphere/STARMAP_CHN_*.svg'],
            runtimeCaching: [
              {
                urlPattern: ({ url }) => url.origin === self.location.origin && url.pathname.includes('/planisphere/'),
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'kidrise-planisphere-styles',
                  expiration: { maxEntries: 8, maxAgeSeconds: 60 * 60 * 24 * 30 },
                },
              },
              {
                urlPattern: ({ request }) => request.destination === 'image',
                handler: 'StaleWhileRevalidate',
                options: {
                  cacheName: 'kidrise-telescope-images',
                  expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
                },
              },
              {
                urlPattern: /^https:\/\/data\.weather\.gov\.hk\//,
                handler: 'NetworkFirst',
                options: {
                  cacheName: 'kidrise-hko-data',
                  networkTimeoutSeconds: 5,
                  expiration: { maxEntries: 12, maxAgeSeconds: 60 * 60 * 6 },
                  cacheableResponse: { statuses: [0, 200] },
                },
              },
            ],
          },
        }),
      ],
      base: '/',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      }
});
