import { Nullable } from "global-types";

export type AnimatorClosure = (() => boolean) | Nullable;

export declare module AnimationData {
  type BezierValue = [number, number, number, number];
  type OnEndFunction = () => void;

  interface StyleData {
    propertyName: string;
    formatValue: string;
    from: Array<string>;
    to: Array<string>;
  }

  interface EssentialData {
    target: HTMLElement;
    styles: Array<StyleData>;
    duration: number;
  }

  /* @export */
  interface Custom extends EssentialData {
    delay?: number;
    bezier?: string | BezierValue;
    onEnd?: OnEndFunction;
    pauseOnEnd?: boolean;
  }

  /* @export */
  interface Parsed extends EssentialData {
    delay: number;
    bezier: BezierValue;
    onEnd: OnEndFunction;
    pauseOnEnd: boolean;
  }
}
