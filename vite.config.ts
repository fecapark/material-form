import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  require("dotenv").config({ path: "./.env" }); // Import dotenv

  if (command === "serve") {
    return {
      base: `/proxy/${process.env.VITE_CODE_SERVER_DEV_PORT}/`,
      server: {
        port: parseInt(process.env.VITE_CODE_SERVER_DEV_PORT),
      },
    };
  } else {
    return {
      base: process.env.VITE_GH_PAGES_PATH,
    };
  }
});
