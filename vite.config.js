import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/macau-cafe-template/', // 加上這行，替換成你的 Repo 名稱
})