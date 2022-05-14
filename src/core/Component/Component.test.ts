/**
 * @jest-environment jsdom
 */

import Component from "./Component.js";

describe("Check 'Component' methods", () => {
  let component; // fixture
  beforeEach(() => {
    component = new Component({});
  });

  it("render() calls setState() when it called.", () => {
    expect(() => {
      component.setState();
    }).toThrow("Please define 'render' method in component.");
  });

  it("render() initalize container's innerHTML to empty", () => {
    component.createContainer([], document.createElement("div"));
    component.render = () => {};
    component.setState();

    expect(component.container.innerHTML).toBe("");
  });

  it("setState() set states correctly", () => {
    const newStates = { a: 1, b: 2, c: 3 };

    try {
      component.setState({ a: 0, b: 1 });
    } catch (e) {}

    try {
      component.setState(newStates);
    } catch (e) {}

    expect(component.state).toEqual(newStates);
  });

  it("createContainer(...) create container element and contains its childs", () => {
    const createContainerData = () => {
      const child1 = document.createElement("div");
      const child2 = document.createElement("a");

      return {
        id: Math.floor(Math.random() * 100).toString(),
        classes: [
          Math.floor(Math.random() * 100).toString(),
          Math.floor(Math.random() * 100).toString(),
        ],
        childs: [child1, child2],
      };
    };

    const extractContainerData = (container) => {
      return {
        id: container.id,
        classes: [...container.classList],
        childs: [...container.childNodes],
      };
    };

    const { id, classes, childs } = createContainerData();
    component.id = id;

    component.createContainer(classes, ...childs);

    expect(extractContainerData(component.container)).toEqual({
      id,
      classes,
      childs,
    });
  });
});
