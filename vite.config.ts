/**
 * 設定 Vite 開發及打包流程；vue 外掛處理單檔元件，vueDevTools 提供開發工具整合。
 * @ 別名指向此專案的 src；TypeScript 另外在 tsconfig.app.json 設定 paths，兩者用途不同但需一致。
 * 此設定沒有 HTTP proxy，畫面中的 API 請求目前直接前往 localhost:8081。
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
