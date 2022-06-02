import { applyStringPrototype } from "./String.extension";

describe("Test count function.", () => {
  beforeAll(() => {
    applyStringPrototype();
  });

  it("Case 1.", () => {
    expect("Lorem isum isis god.".count("is")).toBe(3);
  });

  it("Case 2.", () => {
    expect("Lorem isum isis god.".count(" is")).toBe(2);
  });

  it("Case 3.", () => {
    expect("".count("abcd")).toBe(0);
  });

  it("Case 4.", () => {
    expect("1212".count("")).toBe(0);
  });

  it("Case 5.", () => {
    expect("1111111111".count("111")).toBe(3);
  });
});
