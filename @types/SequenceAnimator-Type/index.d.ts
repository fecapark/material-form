declare module "SequenceAnimator-Type" {
  type CustomAnimationData = import("Animator-Type").AnimationData.Custom;

  export namespace AnimationSequence {
    type Custom = Array<CustomAnimationData> | CustomAnimationData;
    type Parsed = Array<CustomAnimationData>;
  }
}
