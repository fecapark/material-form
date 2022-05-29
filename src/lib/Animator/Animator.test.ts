import Animator, { AnimationData } from "./Animator";

const DUMMY_PREFIX: AnimationData.Custom = {
  target: document.createElement("div"),
  styles: [],
  duration: 0,
};

describe("Test animator - validateUnit", () => {
  let animator: Animator;
  beforeEach(() => {
    animator = new Animator(DUMMY_PREFIX); // Set dummy prefix
  });

  it("Test valid case.", () => {
    expect(animator.validateUnit(["100%", "100px"])).toBe(true);
    expect(animator.validateUnit(["100em"])).toBe(true);
  });

  it("Test bad case", () => {
    expect(animator.validateUnit(["100em", "0"])).toBe(false);
    expect(animator.validateUnit(["102"])).toBe(false);
  });
});

describe("Test animator - splitUnit", () => {
  let animator: Animator;
  beforeEach(() => {
    animator = new Animator(DUMMY_PREFIX); // Set dummy prefix
  });

  it("Test valid case.", () => {
    expect(animator.splitUnit(["100%", "50px"])).toEqual([
      { origin: "100%", value: 100, unit: "%" },
      { origin: "50px", value: 50, unit: "px" },
    ]);
    expect(animator.splitUnit(["10em"])).toEqual([
      { origin: "10em", value: 10, unit: "em" },
    ]);
  });

  it("Test bad case", () => {
    expect(() => {
      animator.splitUnit(["100%", "1"]);
    }).toThrowError(RangeError);
    expect(() => {
      animator.splitUnit(["foo-px", "bar%"]);
    }).toThrowError(TypeError);
  });
});
