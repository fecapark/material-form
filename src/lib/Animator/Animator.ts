import { UserAnimationData } from "Animator-Type";
import SequenceAnimator from "./SequenceAnimator";

export function initEventLine(animationCallBack: () => void, time: number = 0) {
  setTimeout(() => {
    animationCallBack();
  }, time);
}

export default class Animator {
  target: HTMLElement;
  duration: number;
  delay: number;
  bezier: [number, number, number, number];
  animation: () => void;
  callWhenEnd: () => void;
  pauseWhenEnd: boolean;
  isEnd: boolean = false;

  constructor(
    private sequenceAnimator: SequenceAnimator,
    userAnimationData: UserAnimationData
  ) {
    this.target = userAnimationData.target;
    this.animation = userAnimationData.animation;
    this.duration = userAnimationData.duration;
    this.delay = userAnimationData.delay ?? 0;
    this.bezier = userAnimationData.bezier ?? [0, 0, 1, 1];
    this.callWhenEnd = this.createCallWhenEnd(userAnimationData.callWhenEnd);
    this.pauseWhenEnd = userAnimationData.pauseWhenEnd ?? false;
  }

  convertBezierToStyle(): string {
    const [x1, y1, x2, y2]: [number, number, number, number] = this.bezier;
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  }

  setAnimation() {
    this.target.style.transition = `${
      this.duration
    }s ${this.convertBezierToStyle()}`;
    this.target.style.transitionDelay = `${this.delay}s`;
  }

  unsetAnimation() {
    this.target.style.transition = "";
    this.target.style.transitionDelay = "";
  }

  play() {
    initEventLine(() => {
      this.target.addEventListener("transitionend", this.callWhenEnd);
    });
    this.setAnimation();
    this.animation();
  }

  pause() {
    this.sequenceAnimator.pause();
  }

  createCallWhenEnd(userCallback?: () => void): () => void {
    return () => {
      if (userCallback) userCallback();
      if (this.pauseWhenEnd) this.sequenceAnimator.pause();

      this.target.removeEventListener("transitionend", this.callWhenEnd);
      this.unsetAnimation();

      this.isEnd = true;
      this.sequenceAnimator.checkToNextLine();
    };
  }
}
