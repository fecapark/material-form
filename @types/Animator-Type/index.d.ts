declare module "Animator-Type" {
  export interface UserAnimationData {
    target: HTMLElement;
    animation: () => void;
    duration: number;
    delay?: number;
    bezier?: [number, number, number, number];
    callWhenEnd?: () => void;
    pauseWhenEnd?: boolean;
  }
}
