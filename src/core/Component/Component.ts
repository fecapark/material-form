import Store from "../Store/Store";

type ContainerInfos = {
  tagName?: string;
  id?: string;
  classNames?: Array<string>;
};

export default class Component {
  container: HTMLElement;
  id: string;
  classNames: Array<string>;

  constructor(
    public store: Store,
    { tagName, id, classNames }: ContainerInfos = {}
  ) {
    this.id = id ?? "";
    this.classNames = classNames ?? [];
    this.container = this.createContainer(tagName ?? "div");

    store.eventManager.subscribe("stateChange", () => this.render());
  }

  createContainer(tagName: string): HTMLElement {
    const container = document.createElement(tagName);
    container.id = this.id;
    this.classNames.forEach((aClassName) => {
      container.classList.add(aClassName);
    });

    return container;
  }

  removeAllChilds() {
    if (!this.container) return;

    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  render() {
    throw Error("You must implement render method in component instance.");
  }
}
