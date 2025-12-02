import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  ssr: {
    noExternal: ['@tanstack/react-query'], // 强制打包该模块
    target: 'node22'
  },
  build: {
    ssr: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        server: path.resolve(__dirname, 'src/entry-server.jsx')
      }
    }
  }
});