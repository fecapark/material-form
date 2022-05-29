declare module "Animator-Type" {
  type Nullable = import("global-types").Nullable;

  export type BezierValue = [number, number, number, number];
  export type OnEndFunction = ({ target }: { target: HTMLElement }) => void;
  export type AnimatorClosure = (() => boolean) | Nullable;

  interface EssentialData {
    target: HTMLElement;
    styles: Array<StyleData>;
    duration: number;
  }

  export namespace AnimationData {
    interface StyleData {
      propertyName: string;
      formatValue: string;
      from: Array<number>;
      to: Array<number>;
    }

    interface Custom extends EssentialData {
      delay?: number;
      bezier?: string | BezierValue;
      onEnd?: OnEndFunction;
      pauseOnEnd?: boolean;
    }

    interface Parsed extends EssentialData {
      delay: number;
      bezier: BezierValue;
      onEnd: OnEndFunction;
      pauseOnEnd: boolean;
    }
  }
}
