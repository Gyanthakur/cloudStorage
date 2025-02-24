import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://cloud-storage-backend-yuog.onrender.com", // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
