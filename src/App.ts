import "./App.scss";
import Component from "./core/Component/Component";
import Store from "./core/Store/Store";
import { Store as StoreType } from "Store-Type";
import { ROUTES } from "./core/Router/routes";
import Router from "./core/Router/Router";

export default class App {
  globalStore: Store;
  dummyComponent: Dummy;
  routerComponent: RouterComponent;

  constructor(readonly target: HTMLDivElement) {
    console.log("App constructor started!");

    this.globalStore = new Store();
    this.dummyComponent = new Dummy();
    this.routerComponent = new RouterComponent();

    this.setViews();
    this.dispatchInitialRoute();
  }

  setViews() {
    ROUTES.setViewTo("/", () => {
      this.target.appendChild(this.dummyComponent.container);
      this.target.appendChild(this.routerComponent.container);
    });
    ROUTES.setViewTo("/signin", () => {
      this.target.innerHTML = "";
      this.target.textContent = "Sign in!";
    });
  }

  dispatchInitialRoute() {
    const { proxy, path }: { proxy: string; path: string } =
      ROUTES.splitProxyPath(window.location.pathname);

    console.log("dispatch route: ", proxy, path);

    ROUTES.PROXY_ROOT_PATH = proxy;
    ROUTES.view(path);
  }
}

class RouterComponent extends Component {
  constructor() {
    super({ classNames: ["router-wrapper"] });

    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="route" data-route="/signin">Go sign in -></div>
    `;

    new Router(this.container.querySelector(".route")!);
  }
}

class Dummy extends Component {
  constructor() {
    super({ classNames: ["dummy-container"] });

    this.store.setState("dummy-number", 0);
    this.store.setAction(
      "increaseNumber",
      ({ state }: { state: StoreType.State }): StoreType.State => {
        return { "dummy-number": state["dummy-number"] + 1 };
      }
    );

    this.render();
  }

  render() {
    const currentNumber = this.store.getState("dummy-number");

    this.container.innerHTML = `
      <span class="dummy-text">main: ${currentNumber}</span>
      <button class="dummy-button">click!</button>
    `;

    const button: HTMLButtonElement = this.container.querySelector("button")!;
    button.addEventListener("click", () => {
      this.store.dispatch("increaseNumber", {});
    });
  }
}
