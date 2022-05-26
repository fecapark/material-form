declare module "Animator-Type" {
  export type AnimationFunction = ({ target }: { target: HTMLElement }) => void;
  export type BezierValues = [number, number, number, number];
  export type OnEndFunction = () => void;

  interface EssentialAnimationData {
    target: HTMLElement;
    animation: AnimationFunction;
    duration: number;
  }

  export namespace AnimationData {
    interface Custom extends EssentialAnimationData {
      delay?: number;
      bezier?: BezierValues;
      onEnd?: OnEndFunction;
      pauseOnEnd?: boolean;
    }

    interface Parsed extends EssentialAnimationData {
      delay: number;
      bezier: BezierValues;
      onEnd: OnEndFunction;
      pauseOnEnd: boolean;
    }
  }
}
