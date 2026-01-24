import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  if (mode === 'demo') {
    // Demo app build for GitHub Pages
    return {
      plugins: [react()],
      base: '/bs-ad-calendar/',
      build: {
        outDir: 'dist',
        emptyOutDir: true
      }
    }
  }
  
  // Library build
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      lib: {
        entry: 'src/index.ts',
        name: 'BSADCalendar',
        fileName: 'bs-ad-calendar'
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          }
        }
      }
    }
  }
})
