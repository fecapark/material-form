declare global {
  interface String {
    count(toCount: string): number;
    getHash(): { hash: string; salt: string };
  }
}

export function applyStringPrototype() {
  String.prototype.count = function (toCount) {
    if (toCount === "") return 0;
    return this.valueOf().split(toCount).length - 1;
  };

  String.prototype.getHash = function (): { hash: string; salt: string } {
    function getSalt(): string {
      let salt = "";

      for (let i = 0; i < 10; i++) {
        if (Math.random() > 0.5) {
          const ascii = Math.floor(Math.random() * 26) + 97;
          const c = String.fromCharCode(ascii);
          salt += c;
        } else {
          salt += Math.floor(Math.random() * 10);
        }
      }

      return salt;
    }

    const salt: string = getSalt();
    let hash: number = 0;
    let charCode: number;

    for (let i = 0; i < this.length; i++) {
      charCode = this.charCodeAt(i);
      hash = (hash << 5) - hash + charCode;
      hash |= 0;
    }

    return { hash: hash.toString(), salt };
  };
}
