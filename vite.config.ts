import { defineConfig } from "vite";

const PORT: number = 3000;

function getCodeServerCWD(): string {
  return `/proxy/${PORT}/`;
}

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      base: getCodeServerCWD(),
      server: {
        port: PORT,
      },
    };
  } else {
    return {};
  }
});
