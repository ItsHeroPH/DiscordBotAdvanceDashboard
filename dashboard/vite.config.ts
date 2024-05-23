import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    modulePreload: true,
    minify: "terser",
    target: "esnext",
    cssCodeSplit: true,
    cssMinify: "lightningcss",
    rollupOptions: {
      output: {
        assetFileNames: (asset) => {
          let extType = asset?.name?.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType as string)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/script-[hash].js',
        entryFileNames: 'assets/js/script-[hash].js'
      }
    }
  }
})
