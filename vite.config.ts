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
      server: {
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
      css: SCSS_OPTIONS(),
    };
  }

  return {
    css: SCSS_OPTIONS(),
  };
});
