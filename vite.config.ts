import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/vuetify-settings.scss',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  server: {
    port: 5173,
    host: '127.0.0.1',
    proxy: {
      '/api/calendly': {
        target: 'https://api.calendly.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/calendly/, ''),
      },
      '/api/v1': {
        target: 'https://valu8er.instaging.net',
        changeOrigin: true,
      },
    },
  },
})
