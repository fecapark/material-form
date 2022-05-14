import "./App.scss";
import Component from "./core/Component/Component";
import Store from "./core/Store/Store";
import { Store as StoreType } from "Store-Type";

export default class App {
  store: Store;
  dummyComponent: Dummy;

  constructor(readonly target: HTMLDivElement) {
    this.store = new Store();
    this.dummyComponent = new Dummy(this.store);

    target.appendChild(this.dummyComponent.container);
  }
}

class Dummy extends Component {
  constructor(store: Store) {
    super(store, { classNames: ["dummy-container"] });

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
    const currentNumber = this.store.getState("dummy-number");

    this.container.innerHTML = `
      <span class="dummy-text">${currentNumber}</span>
      <button class="dummy-button">click!</button>
    `;

    const button: HTMLButtonElement = this.container.querySelector("button")!;
    button.addEventListener("click", () => {
      this.store.dispatch("increaseNumber", { test: "this is test!" });
    });
  }
}
