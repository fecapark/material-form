import { AnimationSequence } from "Animator-Type";
import Animator from "./Animator";

export default class SequenceAnimator {
  private sequences: Array<AnimationSequence.Parsed>;
  private idx: number = 0;
  private endCount: number = 0;
  private isPaused: boolean = false;

  constructor(
    customSequences: Array<AnimationSequence.Custom>,
    private readonly onAllEnd: () => void = () => {}
  ) {
    this.sequences = this.parseData(customSequences);
  }

  get currentSequence(): AnimationSequence.Parsed {
    return this.sequences[this.idx];
  }

  parseData(
    customSequences: Array<AnimationSequence.Custom>
  ): Array<AnimationSequence.Parsed> {
    return customSequences.map((aCustomSequence) => {
      if (!Array.isArray(aCustomSequence)) {
        return [aCustomSequence];
      }

      return aCustomSequence;
    });
  }

  play() {
    if (this.idx >= this.sequences.length) return;
    this.isPaused = false;

    this.currentSequence.forEach((aAnimationData) => {
      // Animate!
      new Animator(aAnimationData, this.checkToNextSequence.bind(this)).play();

      // Pause after current sequence?
      if (aAnimationData.pauseOnEnd) {
        this.isPaused = true;
      }
    });
  }

  checkToNextSequence() {
    const isSequenceEnd = () => {
      return this.endCount >= this.currentSequence.length;
    };

    const isAllSequencesEnd = () => {
      return this.idx >= this.sequences.length;
    };

    this.endCount++;
    if (!isSequenceEnd()) return;

    this.endCount = 0;
    this.idx++;

    if (isAllSequencesEnd()) {
      this.onAllEnd();
      this.isPaused = false;
      return;
    }

    if (this.isPaused) {
      return;
    }

    this.play();
  }
}
