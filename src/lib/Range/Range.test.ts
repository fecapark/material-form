import { Range } from "./Range";

describe("Test 'Range' methods, by number 6, ", () => {
  const commonRange: Range = new Range(6);

  it("5 < 6 and 6 < -5 => false", () => {
    expect(commonRange.moreThan(5).lessThan(-5).isIn()).toBe(false);
  });

  it("5 < 6 or 6 < -5 => true", () => {
    expect(commonRange.moreThan(5).or().lessThan(-5).isIn()).toBe(true);
  });

  it("0 < 6 < 10 => true", () => {
    expect(commonRange.moreThan(0).lessThan(10).isIn()).toBe(true);
  });

  it("6 <= 6 < 10 => true", () => {
    expect(commonRange.equalAndMoreThan(6).lessThan(10).isIn()).toBe(true);
  });

  it("6 <= 6 <= 6 => true", () => {
    expect(commonRange.equalAndMoreThan(6).equalAndLessThan(6).isIn()).toBe(
      true
    );
  });

  it("No range, only 6 => true", () => {
    expect(commonRange.isIn()).toBe(true);
  });
});
