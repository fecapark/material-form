import "./App.scss";
import Component from "./core/Component/Component";
import Store from "./core/Store/Store";
import { Store as StoreType } from "Store-Type";

export default class App {
  globalStore: Store;
  dummyComponent: Dummy;
  dummyComponent2: SubDummy;

  constructor(readonly target: HTMLDivElement) {
    this.globalStore = new Store();
    this.dummyComponent = new Dummy();
    this.dummyComponent2 = new SubDummy();

    target.appendChild(this.dummyComponent.container);
    target.appendChild(this.dummyComponent2.container);
  }
}

class Dummy extends Component {
  constructor() {
    super({ classNames: ["dummy-container"] });

    this.store.setState("dummy-number", 0);
    this.store.setAction(
      "increaseNumber",
      (state: StoreType.State, payload: StoreType.Payload): StoreType.State => {
        return { "dummy-number": state["dummy-number"] + 1 };
      }
    );

    this.render();
  }

  render() {
    console.log("dummy rendered!");

    const currentNumber = this.store.getState("dummy-number");

    this.container.innerHTML = `
      <span class="dummy-text">main: ${currentNumber}</span>
      <button class="dummy-button">click!</button>
    `;

    const button: HTMLButtonElement = this.container.querySelector("button")!;
    button.addEventListener("click", () => {
      this.store.dispatch("increaseNumber", { test: "this is test!" });
    });
  }
}

class SubDummy extends Component {
  constructor() {
    super({ classNames: ["dummy-container"] });

    this.store.setState("dummy-number-2", 0);
    this.store.setAction(
      "increaseNumber-2",
      (state: StoreType.State, payload: StoreType.Payload): StoreType.State => {
        return { "dummy-number-2": state["dummy-number-2"] + 1 };
      }
    );

    this.render();
  }

  render() {
    console.log("sub-dummy rendered!");

    const currentNumber = this.store.getState("dummy-number-2");

    this.container.innerHTML = `
      <span class="dummy-text">sub: ${currentNumber}</span>
      <button class="dummy-button">click!</button>
    `;

    const button: HTMLButtonElement = this.container.querySelector("button")!;
    button.addEventListener("click", () => {
      this.store.dispatch("increaseNumber-2", { test: "this is test!" });
    });
  }
}
