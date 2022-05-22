declare module "Animator-Type" {
  export interface UserAnimationData {
    target: HTMLElement;
    animation: ({ target }: { target: HTMLElement }) => void;
    duration: number;
    delay?: number;
    bezier?: [number, number, number, number];
    callWhenEnd?: () => void;
    pauseWhenEnd?: boolean;
  }
}
