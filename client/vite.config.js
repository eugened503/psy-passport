import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

const projectRootDir = resolve(__dirname);

export default defineConfig({
  plugins: [
    vue(),
    alias({
      entries: [
        {
          find: "@",
          replacement: resolve(projectRootDir, "src"),
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/index.scss";`,
      },
    },
  },
});
