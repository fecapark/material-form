import Animator, { initEventLine } from "./Animator";
import { AnimationLine, UserAnimationLineData } from "SequenceAnimator-Type";
import { UserAnimationData } from "Animator-Type";

export default class SequenceAnimator {
  animationLines: Array<AnimationLine>;
  currentAnimationIndex: number = 0;
  isStarted: boolean = false;
  isPaused: boolean = false;
  allEnd: boolean = false;

  constructor(
    animatorLineDatas: Array<UserAnimationLineData>,
    private readonly whenAllEnd: () => void = () => {}
  ) {
    this.animationLines = this.lineDatasToAnimationLines(animatorLineDatas);
  }

  lineDatasToAnimationLines(
    animationLineDatas: Array<UserAnimationLineData> = []
  ): Array<AnimationLine> {
    const lineDataToAnimatorLine = (
      aLineData: Array<UserAnimationData>
    ): AnimationLine => {
      return aLineData.map((aData: UserAnimationData) => {
        return new Animator(this, aData);
      });
    };

    return animationLineDatas.map((aLineData) => {
      if (!Array.isArray(aLineData)) aLineData = [aLineData];
      return lineDataToAnimatorLine(aLineData);
    });
  }

  start() {
    this.startLine(!this.isStarted);
    this.isPaused = false;
    this.isStarted = true;
  }

  startLine(initLine: boolean = false) {
    if (this.currentAnimationIndex >= this.animationLines.length) return;

    this.animationLines[this.currentAnimationIndex].forEach(
      (aAnimator: Animator) => {
        if (initLine) {
          initEventLine(() => {
            aAnimator.play();
          });
        } else {
          aAnimator.play();
        }
      }
    );
  }

  checkToNextLine() {
    const isLineEnd = this.animationLines[this.currentAnimationIndex].every(
      (aAnimator: Animator) => {
        return aAnimator.isEnd;
      }
    );

    if (!isLineEnd) return;

    // When all animations end.
    if (++this.currentAnimationIndex >= this.animationLines.length) {
      this.isStarted = false;
      this.isPaused = false;
      this.allEnd = true;
      this.whenAllEnd();
      return;
    }

    if (!this.isPaused) {
      this.animationLines[this.currentAnimationIndex].forEach(
        (aAnimator: Animator) => {
          aAnimator.unsetAnimation();
        }
      );
      this.startLine();
    }
  }

  pause() {
    this.isPaused = true;
  }
}
