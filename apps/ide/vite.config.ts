import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: ".",
  publicDir: "public",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: false,
    rollupOptions: {
      input: resolve(__dirname, "index.html"),
    },
  },
  resolve: {
    alias: {
      "@coderic/ide": resolve(__dirname, "src/index.ts"),
      "@coderic/api-client": resolve(__dirname, "../../packages/api-client/src/index.ts"),
    },
  },
  optimizeDeps: {
    include: [],
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
