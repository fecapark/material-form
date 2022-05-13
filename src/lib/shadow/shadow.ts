import { Range } from "../Range/Range";

const MAX_SHADOW_LEVEL: number = 4;

function removeShadow(element: HTMLElement) {
  element.classList.forEach((className) => {
    if (className.startsWith("shadow-lv-")) {
      element.classList.remove(className);
    }
  });
}

function setShadow(element: HTMLElement, toLv?: number) {
  if (typeof toLv === "undefined") {
    return;
  }

  if (new Range(toLv).lessThan(0).or().moreThan(MAX_SHADOW_LEVEL).isIn()) {
    throw Error("Invalid shadow level to change.");
  }

  removeShadow(element);

  if (toLv === 0) {
    return;
  }

  element.classList.add(`shadow-lv-${toLv}`);
}

export { setShadow, removeShadow };
