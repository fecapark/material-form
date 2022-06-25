import { defineConfig } from "vite";
import path from "path";

require("dotenv").config({ path: "./.env" }); // Import dotenv

const SOURCE_PATH = path.resolve(__dirname, "./src");
const SCSS_OPTIONS = (): object => {
  return {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${SOURCE_PATH}/scss/common/variables";`,
      },
    },
  };
};

export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    return {
      base: `/proxy/${process.env.VITE_CODE_SERVER_DEV_PORT}/`,
      server: {
        port: parseInt(process.env.VITE_CODE_SERVER_DEV_PORT),
        strictPort: true, // Prevent auto polling for restart
        hmr: {
          host: "ws",
          port: 3000,
          clientPort: 3000,
        },
      },
      css: SCSS_OPTIONS(),
    };
  }

  if (mode === "preview-build") {
    return {
      base: `/proxy/3000/proxy/${process.env.VITE_CODE_SERVER_DEV_PORT}/`,
      css: SCSS_OPTIONS(),
    };
  }

  return {
    base: process.env.VITE_DEPLOY_PATH,
    css: SCSS_OPTIONS(),
  };
});
