/**
 * @jest-environment jsdom
 */

import { setShadow } from "./shadow";

describe("Test change shadow level,", () => {
  let fixtureElement: HTMLDivElement;
  beforeEach(() => {
    fixtureElement = document.createElement("div");
  });

  it("Empty shadow -> level 2.", () => {
    setShadow(fixtureElement, 2);
    expect(fixtureElement.classList.contains("shadow-lv-2")).toBe(true);
  });

  it("Case 1 of Level 2 -> level 2.", () => {
    fixtureElement.classList.add("shadow-lv-2");
    setShadow(fixtureElement);
    expect(fixtureElement.classList.contains("shadow-lv-2")).toBe(true);
  });

  it("Case 2 of Level 2 -> level 2.", () => {
    fixtureElement.classList.add("shadow-lv-2");
    setShadow(fixtureElement, 2);
    expect(fixtureElement.classList.contains("shadow-lv-2")).toBe(true);
  });

  it("Level 2 -> level 1.", () => {
    fixtureElement.classList.add("shadow-lv-2");
    setShadow(fixtureElement, 1);
    expect(fixtureElement.classList.contains("shadow-lv-1")).toBe(true);
  });

  it("Level 1 -> level 3.", () => {
    fixtureElement.classList.add("shadow-lv-1");
    setShadow(fixtureElement, 3);
    expect(fixtureElement.classList.contains("shadow-lv-3")).toBe(true);
  });
  it("Level 3 -> Empty shadow", () => {
    fixtureElement.classList.add("shadow-lv-3");
    setShadow(fixtureElement, 0);
    expect(fixtureElement.classList.contains("shadow-lv-3")).toBe(false);
  });
  it("Passed level value is invalid.", () => {
    expect(() => {
      setShadow(fixtureElement, 120);
    }).toThrow("Invalid shadow level to change.");
    expect(() => {
      setShadow(fixtureElement, -1);
    }).toThrow("Invalid shadow level to change.");
  });
});
