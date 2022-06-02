import "./App.scss";
import { ROUTES } from "./core/Router/routes";
import InitialLogo from "./components/InitialLogo/InitialLogo";
import Component from "./core/Component/Component";
import MainContainer from "./components/MainContainer/MainContainer";

export default class App extends Component {
  appRendered: boolean = false;
  initialLogo!: InitialLogo;
  mainContainer!: MainContainer;

  constructor() {
    super({ id: "app" });

    // States
    this.store.setDefaultState("logined", false);
    this.store.setDefaultState("logoEnd", false);
    this.store.setAction("setLogoEnd", ({ state }) => {
      return { logoEnd: !state["logoEnd"] };
    });

    // Set routes
    this.setViews();
    ROUTES.setInitialRootPath();

    this.render();
  }

  setViews() {
    ROUTES.setViewTo("#", this.renderHome.bind(this), this.container);
    ROUTES.setViewTo("#logo", this.renderLogo.bind(this), this.container);
    ROUTES.setViewTo("#signin", this.renderSignIn.bind(this), this.container);
  }

  renderHome() {
    ROUTES.viewWithRedirect("#logo");
  }

  renderLogo() {
    this.initialLogo = new InitialLogo(() => {
      this.store.dispatch("setLogoEnd", {});
    });

    this.container.appendChild(this.initialLogo.container);
  }

  renderSignIn() {
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

    // When re-rendered before logo animation ends.
    if (!this.store.getState("logoEnd")) {
      throw Error("Un expected state change.");
    }

    // Branch routes for user logined before or else.
    if (this.store.getState("logined")) {
      this.container.innerHTML = "Welcome! You logined!";
    } else {
      ROUTES.viewWithRedirect("#signin");
    }
  }
}
