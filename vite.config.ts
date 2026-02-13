import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
        // Base path for Capacitor (relative paths)
        base: './',
        server: {
            port: 3000,
            host: '0.0.0.0',
        },
        plugins: [tailwindcss(), react()],
        define: {
            // 'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY), // Removed for security
            // 'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY) // Removed for security
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            }
        },
        build: {
            outDir: 'dist',
            assetsDir: 'assets',
            // Ensure compatibility
            target: 'es2015'
        }
    };
});
