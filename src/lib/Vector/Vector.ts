export class Vector2 {
  constructor(public x: number, public y: number) {}

  copy(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.x + other.y);
  }

  sub(other: Vector2): Vector2 {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  mul(num: number): Vector2 {
    return new Vector2(this.x * num, this.y * num);
  }

  div(num: number): Vector2 {
    if (num === 0) {
      throw RangeError("You cannot divide vector values by zero.");
    }

    return new Vector2(this.x / num, this.y / num);
  }
}
