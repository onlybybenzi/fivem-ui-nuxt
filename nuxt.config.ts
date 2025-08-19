// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  // Build as a static SPA suitable for NUI
  ssr: false,
  css: ['~/assets/app.css'],
  app: {
    // Ensure all asset URLs are relative for file-based usage
    baseURL: './',
    // Emit built assets at the root so we get ./app.js and ./app.css
    buildAssetsDir: '/'
  },
  // Force a single JS and CSS output with predictable names
  vite: {
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: ({
          inlineDynamicImports: true,
          manualChunks: undefined,
          entryFileNames: 'app.js',
          chunkFileNames: 'app.js',
          assetFileNames: (assetInfo: any) => {
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'app.css'
            }
            return '[name][extname]'
          }
        } as any)
      }
    }
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss'
  ]
})