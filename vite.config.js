import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
// noinspection JSValidateTypes
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    }
  },
  // server: {
  //   port: 3000,
  //   proxy: {
  //     '': {
  //       target: 'http://localhost:8080',
  //       changeOrigin: true,
  //       secure: false, // HTTPS 사용 여부
  //     },
  //   },
  // },
});