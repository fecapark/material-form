import "./App.scss";
import { ROUTES } from "./core/Router/routes";
import Router from "./core/Router/Router";
import Component from "./core/Component/Component";
import InitialLogo from "./components/InitialLogo/InitialLogo";
import SignupContainer from "./components/SignupContainer/SignupContainer";
import LocalStorageManager from "./core/LocalStorage/localStorageManager";

export default class App extends Component {
  private appRendered: boolean = false;
  private initialLogo!: InitialLogo;
  private signupContainer!: SignupContainer;

  constructor() {
    super({ id: "app" });

    // States
    this.store.setDefaultState("showLogoOnce", false);
    this.store.setAction("showLogoOnce", () => {
      return { showLogoOnce: true };
    });

    this.store.setDefaultState("logoEnd", false);
    this.store.setAction("setLogoEnd", ({ state }) => {
      return { logoEnd: !state["logoEnd"] };
    });

    // Set routes
    this.setViews();
    ROUTES.setInitialRootPath();
    new Router(document.createElement("a")); // Initialize router events

    this.initializeLocalStorage();
    this.render();
  }

  private initializeLocalStorage() {
    const setDefault = (key: string, value: any) => {
      try {
        LocalStorageManager.get(key);
      } catch (e) {
        LocalStorageManager.set(key, value);
      }
    };

    setDefault("logined", false);
  }

  private setViews() {
    ROUTES.setViewTo("#", this.renderHome.bind(this), this.container);
    ROUTES.setViewTo("#logo", this.renderLogo.bind(this), this.container);
    ROUTES.setViewTo("#signup", this.renderSignup.bind(this), this.container);
  }

  private renderHome() {
    ROUTES.viewWithRedirect("#logo");
  }

  private renderLogo() {
    this.initialLogo = new InitialLogo(
      this.store.getState("showLogoOnce"),
      () => {
        this.store.dispatch("setLogoEnd", {});
        this.store.dispatch("showLogoOnce", {});
      }
    );

    this.container.appendChild(this.initialLogo.container);
  }

  private renderSignup() {
    this.signupContainer = new SignupContainer();
    this.container.appendChild(this.signupContainer.container);
  }

  render() {
    document.body.prepend(this.container);

    // Execute at first.
    if (!this.appRendered) {
      ROUTES.view(window.location.hash);
      this.appRendered = true;
      return;
    }

    ROUTES.viewWithRedirect("#signup");
  }
}
