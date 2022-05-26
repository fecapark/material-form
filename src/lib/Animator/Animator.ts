declare module AnimationData {
  export type BezierValues = [number, number, number, number];
  export type OnEndFunction = () => void;

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
    bezier?: string | BezierValues;
    onEnd?: OnEndFunction;
    pauseOnEnd?: boolean;
  }

  /* @export */
  interface Parsed extends EssentialData {
    delay: number;
    bezier: string | BezierValues;
    onEnd: OnEndFunction;
    pauseOnEnd: boolean;
  }
}

export default class Animator {
  constructor() {}
}
