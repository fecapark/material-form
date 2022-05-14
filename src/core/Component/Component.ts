export default class Component {
  id: string;
  container: HTMLElement;
  private state: object = {};

  constructor(tagName: string, id?: string) {
    this.id = id ?? "";
    this.container = this.createContainer(tagName);
  }

  createContainer(tagName: string) {
    this.container = document.createElement(tagName);
    this.container.id = this.id;
  }

  removeAllChilds() {
    if (!this.container) return;

    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  setState(stateObject = {}) {
    Object.entries(stateObject).forEach(([stateName, nextValue]) => {
      this.state[stateName] = nextValue;
    });

    if (this.container) this.removeAllChilds();

    this.render();
  }

  render() {
    throw Error("Please define 'render' method in component.");
  }

  createContainer(classNames: Array<string>, ...childs: Array<HTMLElement>) {
    if (!this.container) {
      this.container = document.createElement("div");
    } else {
      this.removeAllChilds();
    }

    if (this.id !== "") this.container.id = this.id;

    classNames.forEach((className) => this.container.classList.add(className));
    childs.forEach((aChild) => this.container.appendChild(aChild));
  }
}
