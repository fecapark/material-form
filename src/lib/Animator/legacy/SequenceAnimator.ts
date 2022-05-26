import Animator from "./Animator";
import { AnimationSequence } from "SequenceAnimator-Type";
import { AnimationData } from "Animator-Type";

export default class SequenceAnimator {
  private animationSequences: Array<AnimationSequence.Parsed>;
  private currentAnimationIndex: number = 0;
  private endCount: number = 0;
  private isPaused: boolean = false;

  constructor(
    customAnimationSequences: Array<AnimationSequence.Custom>,
    private readonly onAllEnd: () => void = () => {}
  ) {
    this.animationSequences = this.wrapCustomSequences(
      customAnimationSequences
    );
  }

  get currentSequence(): AnimationSequence.Parsed {
    return this.animationSequences[this.currentAnimationIndex];
  }

  wrapCustomSequences(
    customAnimationSequences: Array<AnimationSequence.Custom> = []
  ): Array<AnimationSequence.Parsed> {
    return customAnimationSequences.map((aAnimationSequence) => {
      if (!Array.isArray(aAnimationSequence))
        aAnimationSequence = [aAnimationSequence];
      return aAnimationSequence;
    });
  }

  start() {
    if (this.currentAnimationIndex >= this.animationSequences.length) return;

    this.isPaused = false;

    this.currentSequence.forEach((aAnimationData: AnimationData.Custom) => {
      const animator = new Animator(
        aAnimationData,
        this.checkToNextSequence.bind(this)
      );

      animator.play();

      if (aAnimationData.pauseOnEnd) this.isPaused = true;
    });
  }

  checkToNextSequence() {
    if (++this.endCount < this.currentSequence.length) return;
    this.endCount = 0;

    // When all animations end.
    if (++this.currentAnimationIndex >= this.animationSequences.length) {
      this.onAllEnd();
      this.isPaused = false;
      return;
    }

    if (this.isPaused) return;

    this.start();
  }
}
