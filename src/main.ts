import "style.scss";
import App from "./App";

window.onload = () => {
  new App(document.querySelector<HTMLDivElement>("#app")!);
};
