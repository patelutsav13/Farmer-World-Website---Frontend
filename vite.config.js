// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   esbuild: {
//     loader: 'jsx',
//     include: /src\/.*\.js$/,
//     exclude: []
//   },
//   server: {
//     port: 3000,
//     host: true,
//     open: true
//   }
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: []
  },
  server: {
    port: 3000,
    host: true,
    open: true
  },
  build: {
    outDir: 'build'
  }
});
