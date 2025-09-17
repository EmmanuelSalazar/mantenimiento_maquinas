import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),basicSsl()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true,
     proxy: {
      '/api': {
        target: 'https://mantenimiento.altconfecciones.local', // Redirige a la base de tu backend
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});