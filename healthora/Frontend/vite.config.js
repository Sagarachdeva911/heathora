import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cpSync } from "node:fs";
import { resolve } from "node:path";

const root = import.meta.dirname;

// Many pages reference images as plain strings like "src/assets/fitness.png",
// so ship the assets folder as-is alongside the bundled output.
function copyRawAssets() {
  let outDir;
  return {
    name: "copy-raw-assets",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      cpSync(resolve(root, "src/assets"), resolve(outDir, "src/assets"), { recursive: true });
    },
  };
}

export default defineConfig({
  root,
  plugins: [react(), copyRawAssets()],
  build: {
    outDir: resolve(root, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        dashboard: resolve(root, "dashboard.html"),
        article: resolve(root, "article.html"),
        podcast: resolve(root, "podcast.html"),
      },
    },
  },
});
