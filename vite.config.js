import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "apple-touch-icon.png",
      ],

      manifest: {
        name: "Contactify",
        short_name: "Contactify",

        description:
          "Aplicación PWA para administrar contactos",

        theme_color: "#121212",
        background_color: "#121212",

        display: "standalone",

        start_url: "/",

        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },

          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },

          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {
        navigateFallback: "/index.html",

        runtimeCaching: [

          // IMÁGENES
          {
            urlPattern: ({ request }) =>
              request.destination === "image",

            handler: "CacheFirst",

            options: {
              cacheName: "images-cache",

              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },

          // NAVEGACIÓN
          {
            urlPattern: ({ request }) =>
              request.mode === "navigate",

            handler: "NetworkFirst",

            options: {
              cacheName: "pages-cache",

              networkTimeoutSeconds: 3,

              expiration: {
                maxEntries: 20,
              },
            },
          },

        ],
      },
    }),
  ],
});