declare module "Animator-Type" {
  type Nullable = import("global-types").Nullable;

  export type BezierValue = [number, number, number, number];
  export type OnFunction = ({ target }: { target: HTMLElement }) => void;
  export type AnimatorClosure = (() => boolean) | Nullable;

  interface EssentialData {
    target: HTMLElement;
    styles: Array<AnimationData.StyleData>;
    duration: number;
  }

  export namespace AnimationData {
    interface StyleData {
      prop: string;
      fvalue: string;
      from: () => Array<number>;
      to: () => Array<number>;
    }

    interface Custom extends EssentialData {
      delay?: number;
      bezier?: string | BezierValue;
      onStart?: OnFunction;
      onEnd?: OnFunction;
      pauseOnEnd?: boolean;
    }

    interface Parsed extends EssentialData {
      delay: number;
      bezier: BezierValue;
      onStart: OnFunction;
      onEnd: OnFunction;
      pauseOnEnd: boolean;
    }
  }

  export namespace AnimationSequence {
    type Parsed = Array<AnimationData.Custom>;
    type Custom = Parsed | AnimationData.Custom;
  }
}
