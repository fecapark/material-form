import Store from "../Store/Store";

type ContainerInfos = {
  tagName?: string;
  id?: string;
  classNames?: Array<string>;
};

export default class Component {
  protected readonly store: Store;
  readonly container: HTMLElement;
  readonly id: string;
  classNames: Array<string>;

  constructor({
    tagName = "div",
    id = "",
    classNames = [],
  }: ContainerInfos = {}) {
    this.id = id;
    this.classNames = classNames.filter((aClassName) => {
      return aClassName.trim() !== "";
    });
    this.container = this.createContainer(tagName);

    this.store = new Store();
    this.store.eventManager.subscribe("stateChange", () => this.render());
  }

  protected createContainer(tagName: string): HTMLElement {
    const container = document.createElement(tagName);
    container.id = this.id;
    this.classNames.forEach((aClassName) => {
      container.classList.add(aClassName);
    });

    return container;
  }

  protected appendElementsTo(
    parentSelector: string,
    ...elements: Array<HTMLElement>
  ) {
    let parent = this.qs(parentSelector);

    if (!parent) {
      if (parentSelector !== "")
        throw TypeError(
          `Cannot find elememnt using selector: ${parentSelector}`
        );

      parent = this.container;
    }

    elements.forEach((element) => {
      parent!.appendChild(element);
    });
  }

  protected prependElementsTo(
    parentSelector: string,
    ...elements: Array<HTMLElement>
  ) {
    let parent = this.qs(parentSelector);

    if (!parent) {
      if (parentSelector !== "")
        throw TypeError(
          `Cannot find elememnt using selector: ${parentSelector}`
        );

      parent = this.container;
    }

    elements.forEach((element) => {
      parent!.prepend(element);
    });
  }

  qs<K extends keyof HTMLElementTagNameMap>(
    selector: string
  ): HTMLElementTagNameMap[K] | null {
    try {
      return this.container.querySelector(selector);
    } catch (e) {
      return null;
    }
  }

  html(): string {
    return this.container.outerHTML;
  }

  render() {
    throw Error("You must implement render method in component instance.");
  }
}
