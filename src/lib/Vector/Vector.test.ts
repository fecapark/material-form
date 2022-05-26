import { Vector2 } from "./Vector";

describe("Test vector", () => {
  it("Add vectors", () => {
    const resultVector: Vector2 = new Vector2(1, 1).add(new Vector2(2, 2));

    expect(resultVector.x).toBe(3);
    expect(resultVector.y).toBe(3);
  });

  it("Substract vectors", () => {
    const resultVector: Vector2 = new Vector2(1, 1).sub(new Vector2(2, 2));

    expect(resultVector.x).toBe(-1);
    expect(resultVector.y).toBe(-1);
  });

  it("Multiply vector - 1", () => {
    const resultVector: Vector2 = new Vector2(1, 1).mul(0);

    expect(resultVector.x).toBe(0);
    expect(resultVector.y).toBe(0);
  });

  it("Multiply vector - 2", () => {
    const resultVector: Vector2 = new Vector2(3, 2).mul(8);

    expect(resultVector.x).toBe(24);
    expect(resultVector.y).toBe(16);
  });

  it("Divide vector - 1", () => {
    const resultVector: Vector2 = new Vector2(6, 10).div(2);

    expect(resultVector.x).toBe(3);
    expect(resultVector.y).toBe(5);
  });

  it("Divide vector - 2", () => {
    expect(() => {
      new Vector2(6, 10).div(0);
    }).toThrowError(RangeError);
  });

  it("Copy vectors", () => {
    const origin = new Vector2(0, 0);
    const copied = origin.copy();

    expect(origin.x === copied.x && origin.y === origin.y).toBe(true);
    expect(Object.is(origin, copied)).toBe(false);
  });
});
