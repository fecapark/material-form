class LSData {
  readonly data: string;
  readonly parsed: any;

  constructor(data: string) {
    this.data = data;
    this.parsed = this.parse(data);
  }

  private parse(data: string): any {
    return JSON.parse(data);
  }
}

export default class LocalStorageManager {
  static get(key: string): LSData {
    const hashKey: string = key.getHash().hash;

    const data: string | null = window.localStorage.getItem(hashKey);

    if (!data) throw Error(`Invalid key name '${key}'.`);
    return new LSData(data);
  }

  static set(key: string, data: any) {
    const hashKey: string = key.getHash().hash;
    return window.localStorage.setItem(hashKey, JSON.stringify(data));
  }
}
