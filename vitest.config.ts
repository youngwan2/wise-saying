import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite' // 상단에 import 안 해도 바로 패키지 모듈 사용 가능하게 해줌
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports:['vitest'],
      dts:true // 타입스크립트 선언 생성
    })
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
})
