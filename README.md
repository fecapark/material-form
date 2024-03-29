# Material Form

by fecapark

inspired by [Google Material Design Video](https://youtu.be/Q8TXgCzxEnw?si=_fTbD2VO4YCIZtPK)

## Demo

[Project Link](https://fecapark.github.io/material-form/)

<img src="https://github.com/fecapark/material-form/assets/101973955/eae7028e-cbaa-4d54-b948-591b44fe8060" width="550px" alt="wait...">

### About Code

<details>
<summary>Toogle</summary>
 
### Stack history

- `Flux Pattern` & `Pub/Sub Pattern` for vanila component
- Use `Vite`
- Use `Typescript`
- Use `SCSS`
- Use `Jest`
- Use SPA Router with vanila js(ts)

## How to write a Component?

```ts
import Component from "{{Component-Path}}";

class ComponentExample extends Component {
  constructor() {
    // 1. Set tagName, id, classNames.
    super({
      tagName: "div",
      id: "this-is-id",
      classNames: ["example", "class"],
    });

    // 2. Set component states (access by this.store).
    // When this.store.setDefaultState triggers, this.render method will not be called.
    this.store.setDefaultState("my-number", 0);
    this.store.setAction(
      "increaseNumber",
      ({ state }: { state: StoreType.State }): StoreType.State => {
        return { "my-number": state["my-number"] + 1 };
      }
    );

    // 3. Call render method.
    this.render();
  }

  render() {
    // You can get current state value from this.store member.
    const currentNumber = this.store.getState("dummy-number");

    // Set innerHTML to render component.
    this.container.innerHTML = `
      <span class="dummy-text">main: ${currentNumber}</span>
      <button class="dummy-button">click!</button>
    `;

    // Write some logic for state changes or routers.
    const button: HTMLButtonElement = this.container.querySelector("button")!;
    button.addEventListener("click", () => {
      this.store.dispatch("increaseNumber", {});
    });
  }
}
```

## How to write some Routers inside of a component?

```ts
class RouterComponent extends Component {
  constructor() {
    // Write component constructor.
    super({ classNames: ["router-wrapper"] });

    this.render();
  }

  render() {
    // Set innerHTML for component rendering.
    // You MUST BE SET 'anchor' tag to use Router.
    // Also, set href attribute and value as hash path into it.
    this.container.innerHTML = `
      <a class="route" href="#signin">Go sign in -></a>
    `;

    // Use Router class for routing.
    new Router(this.container.querySelector(".route")!);
  }
}
```

</details>
