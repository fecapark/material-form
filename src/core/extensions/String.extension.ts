declare global {
  interface String {
    count(toCount: string): number;
  }
}

export function applyStringPrototype() {
  String.prototype.count = function (toCount) {
    if (toCount === "") return 0;
    return this.valueOf().split(toCount).length - 1;
  };
}
