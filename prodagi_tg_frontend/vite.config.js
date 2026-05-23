import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
    const rootDir = fileURLToPath(new URL('.', import.meta.url));
    const env = loadEnv(mode, rootDir, '');
    const proxyTarget = env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:8000';

    return {
        plugins: [
            react(),
            tailwindcss(),
            svgr({
                svgrOptions: {
                    exportType: 'named',
                    ref: true,
                    svgo: false,
                    titleProp: true,
                },
                include: '**/*.svg',
            }),
        ],
        resolve: {
            alias: {
                src: '/src',
            },
        },
        server: {
            proxy: {
                '/api': {
                    target: proxyTarget,
                    changeOrigin: true,
                },
            },
        },
    };
});
