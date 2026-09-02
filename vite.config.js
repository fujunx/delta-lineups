import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/delta-lineups/' : '/',
  plugins: [vue()],
  server: {
    watch: {
      // 编辑器/写入工具通过“临时文件 + 重命名”写入源码，会生成 .xxx.tmpdir 中间目录，
      // 监视器对其 fs.watch 会在 Windows 上触发 EBUSY 导致崩溃，这里忽略掉。
      ignored: (p) => p.includes('.tmpdir'),
    },
  },
}))
