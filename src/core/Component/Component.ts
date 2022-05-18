import Store from "../Store/Store";

type ContainerInfos = {
  tagName?: string;
  id?: string;
  classNames?: Array<string>;
};

export default class Component {
  protected readonly store: Store;
  readonly container: HTMLElement;
  id: string;
  classNames: Array<string>;

  constructor({
    tagName = "div",
    id = "",
    classNames = [],
  }: ContainerInfos = {}) {
    this.id = id;
    this.classNames = classNames;
    this.container = this.createContainer(tagName);

    this.store = new Store();
    this.store.eventManager.subscribe("stateChange", () => this.render());
  }

  createContainer(tagName: string): HTMLElement {
    const container = document.createElement(tagName);
    container.id = this.id;
    this.classNames.forEach((aClassName) => {
      container.classList.add(aClassName);
    });

    return container;
  }

  render() {
    throw Error("You must implement render method in component instance.");
  }
}
