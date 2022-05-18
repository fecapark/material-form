import { defineConfig } from "vite";

require("dotenv").config({ path: "./.env" }); // Import dotenv

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      base: `/proxy/${process.env.VITE_CODE_SERVER_DEV_PORT}/`,
      server: {
        port: parseInt(process.env.VITE_CODE_SERVER_DEV_PORT),
      },
    };
  }

  return {
    base: process.env.VITE_DEPLOY_PATH,
  };
});
