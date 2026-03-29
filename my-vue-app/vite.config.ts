import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 配置模块解析时的路径别名。
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
