import "./scss/style.scss";
import App from "./App";

window.onload = () => {
  console.log("App started!");
  new App(document.querySelector<HTMLDivElement>("#app")!);
};
