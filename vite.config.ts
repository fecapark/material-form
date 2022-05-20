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

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      base: `/proxy/${process.env.VITE_CODE_SERVER_DEV_PORT}/`,
      server: {
        port: parseInt(process.env.VITE_CODE_SERVER_DEV_PORT),
      },
      css: SCSS_OPTIONS(),
    };
  }

  return {
    base: process.env.VITE_DEPLOY_PATH,
    css: SCSS_OPTIONS(),
  };
});
