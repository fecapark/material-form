import "./scss/style.scss";
import App from "./App";
import { applyStringPrototype } from "./core/extensions/String.extension";

function applyPrototypes() {
  applyStringPrototype();
}

window.onload = () => {
  applyPrototypes();
  new App();
};
