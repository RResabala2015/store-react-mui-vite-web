import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  devServer: {
    proxy: {
      "/api": {
        ws: true,
        changeOrigin: true,
        target: "http://localhost:8085"
      }
    }
  }
})
