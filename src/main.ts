import "./scss/style.scss";
import App from "./App";
import { applyStringPrototype } from "./core/extensions/String.extension";

function displayStageSize() {
  const display = document.createElement("div");
  display.style.position = "fixed";
  display.style.top = "10px";
  display.style.right = "10px";
  display.style.zIndex = "10000000";

  function resize() {
    display.innerHTML = `
        <span class="width">${document.body.clientWidth}px x </span>
        <span class="height">${document.body.clientHeight}px</span>
      `;
  }

  resize();
  window.addEventListener("resize", resize);

  document.body.prepend(display);
}

function applyPrototypes() {
  applyStringPrototype();
}

window.onload = () => {
  applyPrototypes();
  new App();
  // displayStageSize();
};
