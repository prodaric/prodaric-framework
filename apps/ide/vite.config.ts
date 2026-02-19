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
      "@coderic/layout": resolve(__dirname, "../../packages/layout/src/index.ts"),
      "@coderic/node-canvas": resolve(__dirname, "../../packages/node-canvas/src/index.ts"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@lumino/widgets", "rete", "rete-area-plugin", "rete-connection-plugin", "rete-react-plugin", "rete-render-utils"],
  },
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
});
