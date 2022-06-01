declare module "AnimationHistory-Type" {
  export interface ValidatableData {
    target: HTMLElement;
    prop: string;
    fvalue: string;
  }

  export interface HistoryData extends ValidatableData {
    from: Array<number>;
    to: Array<number>;
  }
}
