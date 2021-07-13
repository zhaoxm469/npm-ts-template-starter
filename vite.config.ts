import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        open: '/examples/index.html',
    },
    build: {
        target: 'es2015',
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            // 暴露全局的变量
            name: 'AppCache',
            formats: ['es', 'umd']
        },
    },
});
