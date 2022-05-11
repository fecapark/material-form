import { defineConfig } from "vite";

const PORT = 3000;

function getCodeServerCWD() {
  return `/proxy/${PORT}/`;
}

export default defineConfig(({ command, _ }) => {
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
