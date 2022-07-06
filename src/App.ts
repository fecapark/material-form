import "./App.scss";
import { ROUTES } from "./core/Router/routes";
import Router from "./core/Router/Router";
import Component from "./core/Component/Component";
import InitialLogo from "./components/InitialLogo/InitialLogo";
import SignupContainer from "./components/SignupContainer/SignupContainer";
import MainContainer from "./components/MainContainer/MainContainer";
import LocalStorageManager from "./core/LocalStorage/localStorageManager";

export default class App extends Component {
  private appRendered: boolean = false;
  private initialLogo!: InitialLogo;
  private signupContainer!: SignupContainer;
  private mainContainer!: MainContainer;

  constructor() {
    super({ id: "app" });

    // States
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
    ROUTES.setViewTo("#main", this.renderMain.bind(this), this.container);
  }

  private renderHome() {
    ROUTES.viewWithRedirect("#logo");
  }

  private renderLogo() {
    this.initialLogo = new InitialLogo(() => {
      this.store.dispatch("setLogoEnd", {});
    });

    this.container.appendChild(this.initialLogo.container);
  }

  private renderSignup() {
    if (LocalStorageManager.get("logined").parsed) {
      ROUTES.viewWithRedirect("#");
      return;
    }

    this.signupContainer = new SignupContainer();
    this.container.appendChild(this.signupContainer.container);
  }

  private renderMain() {
    if (!LocalStorageManager.get("logined").parsed) {
      ROUTES.viewWithRedirect("#signup");
      return;
    }

    this.mainContainer = new MainContainer();
    this.container.appendChild(this.mainContainer.container);
  }

  render() {
    document.body.prepend(this.container);

    // Execute at first.
    if (!this.appRendered) {
      ROUTES.view(window.location.hash);
      this.appRendered = true;
      return;
    }

    // Branch routes for user logined before or else.
    if (LocalStorageManager.get("logined").parsed) {
      ROUTES.viewWithRedirect("#main");
    } else {
      ROUTES.viewWithRedirect("#signup");
    }
  }
}
