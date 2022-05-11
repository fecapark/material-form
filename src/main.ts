import App from "./App";
import "./style.scss";

window.onload = () => {
  new App(document.querySelector<HTMLDivElement>("#app")!);
};
