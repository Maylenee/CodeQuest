import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// EdgeOne Makers menjalankan fungsi lokal lewat `edgeone pages dev` (default port 8089).
// Saat `npm run dev` (Vite) jalan terpisah, kita proxy semua route function ke server itu
// supaya /tracks, /tutor, dst tetap bisa diakses dari frontend tanpa CORS.
const FUNCTIONS_DEV_SERVER = 'http://127.0.0.1:8089';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api/learn': FUNCTIONS_DEV_SERVER,
      '/api/dashboard': FUNCTIONS_DEV_SERVER,
      '/api/auth': FUNCTIONS_DEV_SERVER,
      '/tracks': FUNCTIONS_DEV_SERVER,
      '/track-detail': FUNCTIONS_DEV_SERVER,
      '/lesson-detail': FUNCTIONS_DEV_SERVER,
      '/progress': FUNCTIONS_DEV_SERVER,
      '/conversations': FUNCTIONS_DEV_SERVER,
      '/conversation-messages': FUNCTIONS_DEV_SERVER,
      '/tutor': FUNCTIONS_DEV_SERVER,
      '/tutor-stop': FUNCTIONS_DEV_SERVER,
      '/code-runner': FUNCTIONS_DEV_SERVER,
    },
  },
  build: {
    outDir: 'dist',
  },
});
