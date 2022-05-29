import { AnimationData, AnimationFunction, OnEndFunction } from "Animator-Type";

export function moveEventStack(eventCall: () => void, time: number = 0) {
  requestAnimationFrame(() => setTimeout(() => eventCall(), time));
}

export default class LegacyAnimator {
  private data: AnimationData.Parsed;
  private resolveWrapper: ((e: Event) => void) | undefined = undefined;

  constructor(
    customData: AnimationData.Custom,
    private additionalOnEnd: OnEndFunction = () => {}
  ) {
    this.data = this.parseData(customData);
  }

  parseData(customData: AnimationData.Custom): AnimationData.Parsed {
    return {
      target: customData.target,
      animation: customData.animation,
      duration: customData.duration,
      delay: this.formatDelay(customData.delay),
      bezier: customData.bezier ?? [0, 0, 1, 1],
      onEnd: customData.onEnd ?? (() => {}),
      pauseOnEnd: customData.pauseOnEnd ?? false,
    };
  }

  getAnimationPromise(): Promise<Event> {
    const {
      target,
      animation,
    }: { target: HTMLElement; animation: AnimationFunction } = this.data;

    return new Promise((resolve) => {
      this.setAnimation();

      if (!this.resolveWrapper) this.resolveWrapper = (e: Event) => resolve(e);
      moveEventStack(() => {
        target.addEventListener(
          "transitionend",
          this.resolveWrapper as EventListener
        );

        animation({ target });
      });
    });
  }

  getStyledBezier(): string {
    const [x1, y1, x2, y2]: [number, number, number, number] = this.data.bezier;
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  }

  formatDelay(delay?: number): number {
    const MIN_DELAY = 0.01;
    const formatedDelay = delay ?? MIN_DELAY;

    return formatedDelay <= MIN_DELAY ? MIN_DELAY : formatedDelay;
  }

  setAnimation() {
    const {
      target,
      duration,
      delay,
    }: { target: HTMLElement; duration: number; delay: number } = this.data;

    target.style.transition = `${duration}s ${this.getStyledBezier()} ${delay}s`;
  }

  unsetAnimation() {
    const { target }: { target: HTMLElement } = this.data;

    target.style.transition = "";
    target.style.transitionDelay = "";
  }

  play() {
    const { target, onEnd }: { target: HTMLElement; onEnd: OnEndFunction } =
      this.data;
    const animationPromise = this.getAnimationPromise();

    animationPromise.then((e: Event) => {
      e.stopPropagation();

      if (this.resolveWrapper)
        target.removeEventListener("transitionend", this.resolveWrapper);

      this.unsetAnimation();

      onEnd();
      this.additionalOnEnd();
    });
  }
}
