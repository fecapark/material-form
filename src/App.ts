import "./App.scss";
import Store from "./core/Store/Store";
import { ROUTES } from "./core/Router/routes";

export default class App {
  globalStore: Store;

  constructor(readonly target: HTMLDivElement) {
    this.globalStore = new Store();

    // Set routes
    this.setViews();
    ROUTES.setInitialRootPath();
    ROUTES.view(window.location.hash);
  }

  setViews() {
    ROUTES.setViewTo("#", () => {});
    ROUTES.setViewTo("#signin", () => {});
  }
}
