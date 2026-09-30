import { cpSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = import.meta.dirname;

// Article/podcast data references images by runtime strings such as
// "src/assets/fitness.png", so copy the folder into the build output as-is.
function copyRuntimeAssets() {
  let outDir;
  return {
    name: "copy-runtime-assets",
    apply: "build",
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      cpSync(resolve(root, "src/assets"), resolve(outDir, "src/assets"), {
        recursive: true,
      });
    },
  };
}

export default defineConfig({
  root,
  plugins: [react(), copyRuntimeAssets()],
  build: {
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
