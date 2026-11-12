import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// The production build is ONE self-contained dist/index.html (all JS/CSS inlined), so it opens by
// double-click (file://) as well as from any web server or sub-folder (e.g. XAMPP htdocs).
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  server: { port: 5173, strictPort: false },
  build: { chunkSizeWarningLimit: 4000 },
  test: { environment: 'node', include: ['src/**/*.test.ts'] },
});
