// vite.config.js

// 1. IMPORT 'path' module
import path from 'path'; 
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Assuming this is still present

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  
  // 2. ADD THE RESOLVE BLOCK
  resolve: {
    alias: {
      // This maps the alias '@' used in imports (e.g., '@/lib/utils') 
      // to the absolute path of your 'src' directory.
      "@": path.resolve(__dirname, "./src"), 
    },
  },
});