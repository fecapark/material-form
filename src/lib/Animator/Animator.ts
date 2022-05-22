import { UserAnimationData } from "Animator-Type";
import SequenceAnimator from "./SequenceAnimator";

export function initEventLine(animationCallBack: () => void, time: number = 1) {
  setTimeout(() => {
    animationCallBack();
  }, time);
}

export default class Animator {
  target: HTMLElement;
  duration: number;
  delay: number;
  bezier: [number, number, number, number];
  animation: ({ target }: { target: HTMLElement }) => void;
  callWhenEnd: (e: Event) => void;
  pauseWhenEnd: boolean;
  isEnd: boolean = false;

  constructor(
    private sequenceAnimator: SequenceAnimator,
    userAnimationData: UserAnimationData
  ) {
    this.target = userAnimationData.target;
    this.animation = userAnimationData.animation;
    this.duration = userAnimationData.duration;
    this.delay = this.formatDelay(userAnimationData.delay);
    this.bezier = userAnimationData.bezier ?? [0, 0, 1, 1];
    this.callWhenEnd = this.createCallWhenEnd(userAnimationData.callWhenEnd);
    this.pauseWhenEnd = userAnimationData.pauseWhenEnd ?? false;
  }

  convertBezierToStyle(): string {
    const [x1, y1, x2, y2]: [number, number, number, number] = this.bezier;
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  }

  formatDelay(delay?: number): number {
    const minValue = 0.01;
    const formatedDelay = delay ?? minValue;
    return formatedDelay <= minValue ? minValue : formatedDelay;
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
    this.animation({ target: this.target });
  }

  pause() {
    this.sequenceAnimator.pause();
  }

  createCallWhenEnd(userCallback?: () => void): (e: Event) => void {
    return (e: Event) => {
      e.stopPropagation();

      if (userCallback) userCallback();
      if (this.pauseWhenEnd) this.sequenceAnimator.pause();

      this.target.removeEventListener("transitionend", this.callWhenEnd);

      this.isEnd = true;
      this.sequenceAnimator.checkToNextLine();
    };
  }
}
