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
    this.globalStore = new Store();
    this.dummyComponent = new Dummy();
    this.routerComponent = new RouterComponent();

    this.setViews();
    this.dispatchInitialRoute();
  }

  setViews() {
    ROUTES.setViewTo("#", () => {
      this.target.appendChild(this.dummyComponent.container);
      this.target.appendChild(this.routerComponent.container);
    });
    ROUTES.setViewTo("#signin", () => {
      this.target.innerHTML = "wow";
      this.target.innerHTML = "<a class='router' href='#dummy'>Dummy!</a>";
      new Router(this.target.querySelector(".router")!);
    });
    ROUTES.setViewTo("#dummy", () => {
      this.target.innerHTML = "Dummy reached!";
    });
  }

  dispatchInitialRoute() {
    const { proxy }: { proxy: string } = ROUTES.splitProxyPath(
      window.location.pathname
    );

    // For proxy server
    if (proxy !== "") {
      ROUTES.ROOT_PATH = `${proxy}/`;
    }

    ROUTES.view(window.location.hash);
  }
}

class RouterComponent extends Component {
  constructor() {
    super({ classNames: ["router-wrapper"] });

    this.render();
  }

  render() {
    this.container.innerHTML = `
      <a class="route" href="#signin">Go sign in -></a>
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
