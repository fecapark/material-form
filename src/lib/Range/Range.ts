class Range {
  private result: boolean;
  private isOr: boolean;

  constructor(private value: number, prevResult: boolean = true) {
    this.result = prevResult;
    this.isOr = false;
  }

  or(): Range {
    this.isOr = true;
    return this;
  }

  mergeResult(prev: boolean): boolean {
    if (this.isOr) {
      return this.result || prev;
    }

    return this.result && prev;
  }

  moreThan(num: number): Range {
    return new Range(this.value, this.mergeResult(this.value > num));
  }

  lessThan(num: number): Range {
    return new Range(this.value, this.mergeResult(this.value < num));
  }

  equalAndMoreThan(num: number): Range {
    return new Range(this.value, this.mergeResult(this.value >= num));
  }

  equalAndLessThan(num: number): Range {
    return new Range(this.value, this.mergeResult(this.value <= num));
  }

  isIn(): boolean {
    return this.result;
  }
}

export { Range };
