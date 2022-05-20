import "./App.scss";
import Store from "./core/Store/Store";
import { ROUTES } from "./core/Router/routes";
import InitialLogo from "./components/InitialLogo/InitialLogo";

export default class App {
  globalStore: Store;
  logined: boolean;

  // Component types
  initialLogo!: InitialLogo;

  constructor(readonly target: HTMLDivElement) {
    this.globalStore = new Store();

    // Test parameters
    this.logined = false;

    // Render components
    this.preRenderComponents();

    // Set routes
    this.setViews();
    ROUTES.setInitialRootPath();
    ROUTES.view(window.location.hash);
  }

  preRenderComponents() {
    this.initialLogo = new InitialLogo();
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

    // Todo: render logo
    this.target.innerHTML = "Welcome! logined!";
  }

  renderSignIn() {
    this.target.appendChild(this.initialLogo.container);
  }
}
