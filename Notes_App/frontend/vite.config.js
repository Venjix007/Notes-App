import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: true,
      sourcemap: isProduction ? false : 'inline',
      minify: false, // Disable minification to avoid terser dependency
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom', 'axios'],
          },
        },
      },
    },
    server: {
      proxy: isProduction ? undefined : {
        '/api': {
          target: 'http://localhost:5001',
          changeOrigin: true,
        },
      },
    },
    // Use relative paths in production for deployment to subdirectories if needed
    base: isProduction ? './' : '/',
    // Environment variables configuration
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || mode),
    },
  };
});
