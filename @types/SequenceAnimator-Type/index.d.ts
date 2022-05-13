declare module "SequenceAnimator-Type" {
  type Animator = import("../../src/lib/Animator/Animator").Animator;
  type UserAnimationData = import("Animator-Type").UserAnimationData;

  export type AnimationLine = Array<Animator>;
  export type UserAnimationLineData =
    | Array<UserAnimationData>
    | UserAnimationData;
}
