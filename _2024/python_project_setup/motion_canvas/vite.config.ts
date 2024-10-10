import { defineConfig } from "vite";
import motionCanvas from "@motion-canvas/vite-plugin";
import ffmpeg from "@motion-canvas/ffmpeg";
import path from "path";

export default defineConfig({
  plugins: [motionCanvas(), ffmpeg()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
