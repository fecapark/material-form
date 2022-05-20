import "./App.scss";
import Store from "./core/Store/Store";
import { ROUTES } from "./core/Router/routes";

export default class App {
  globalStore: Store;
  logined: boolean;

  constructor(readonly target: HTMLDivElement) {
    this.globalStore = new Store();

    // Test parameters
    this.logined = false;

    // Set routes
    this.setViews();
    ROUTES.setInitialRootPath();
    ROUTES.view(window.location.hash);
  }

  setViews() {
    ROUTES.setViewTo("#", this.renderHome.bind(this));
    ROUTES.setViewTo("#signin", this.renderSignIn.bind(this));
  }

  renderHome() {
    if (!this.logined) {
      ROUTES.viewWithRedirect("#signin");
      return;
    }

    this.target.innerHTML = "Welcome! You logined!";
  }

  renderSignIn() {
    this.target.innerHTML = "Here is signin.";
  }
}
