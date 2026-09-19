import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },

  vite: {
    resolve: {
      dedupe: ["react-i18next", "i18next", "react", "react-dom"],
    },
  },

  nitro: {
    preset: "node-server",
  },
});