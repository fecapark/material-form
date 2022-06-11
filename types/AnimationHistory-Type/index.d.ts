declare module "AnimationHistory-Type" {
  type CustomAnimationData = import("Animator-Type").AnimationData.Custom;
  type ParsedAnimationData = import("Animator-Type").AnimationData.Parsed;

  export interface AbstractAnimationHistoryStorage {
    readonly length: number;
    find(
      target: HTMLElement,
      prop: string,
      fvalue: string
    ): HistoryData | undefined;
    push(aAnimationData: CustomAnimationData | ParsedAnimationData): void;
  }

  export interface ValidatableData {
    target: HTMLElement;
    prop: string;
    fvalue: string;
  }

  export interface HistoryData extends ValidatableData {
    from: () => Array<number>;
    to: () => Array<number>;
  }
}
