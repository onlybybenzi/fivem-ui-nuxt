import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Keep a single CSS file with a stable name
    cssCodeSplit: false,
    // Place assets at the build root instead of assets/ subfolder
    assetsDir: '.',
    rollupOptions: {
      input: 'index.html',
      output: {
        // Force a single entry JS bundle name
        entryFileNames: 'app.js',
        // Inline dynamic imports to avoid multiple JS chunks
        inlineDynamicImports: true,
        // Name CSS and other assets deterministically at the root
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'app.css'
          }
          return '[name][extname]'
        },
      },
    },
  },
})
