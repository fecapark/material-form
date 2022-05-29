import BezierEasing from "bezier-easing";
import { AnimationData, AnimatorClosure } from "../../../@types/Animator-Type";

const BEZIER_EASING_MAP: Record<string, AnimationData.BezierValue> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "material-normal": [0.4, 0, 0.2, 1],
  "material-accel": [0, 0, 0.2, 1],
};

export default class Animator {
  private data: AnimationData.Parsed;
  private animator: AnimatorClosure = null;

  constructor(customData: AnimationData.Custom) {
    this.data = this.parseData(customData);
  }

  parseData(customData: AnimationData.Custom): AnimationData.Parsed {
    const bezierValue =
      typeof customData.bezier === "string"
        ? BEZIER_EASING_MAP[customData.bezier]
        : customData.bezier ?? BEZIER_EASING_MAP["linear"];

    // Check formats
    customData.styles.forEach((aStyleData) => {
      const { from, to }: { from: Array<string>; to: Array<string> } =
        aStyleData;

      if (!this.isAnimateValueAsPixel(from, to)) {
        throw TypeError("Animation value's unit must be pixel.");
      }

      if (from.length !== to.length) {
        throw RangeError(
          "Animation from and to value must be matched one-to-one."
        );
      }
    });

    return {
      target: customData.target,
      styles: customData.styles,
      duration: customData.duration,
      delay: customData.delay ?? 0,
      bezier: bezierValue,
      onEnd: customData.onEnd ?? (() => {}),
      pauseOnEnd: customData.pauseOnEnd ?? false,
    };
  }

  isAnimateValueAsPixel(from: Array<string>, to: Array<string>): boolean {
    return (
      from.every((aFrom) => aFrom.endsWith("px")) &&
      to.every((aTo) => aTo.endsWith("px"))
    );
  }

  getCurrentValuesAsRatio(
    from: Array<string>,
    to: Array<string>,
    ratio: number
  ): Array<number> {
    const result: Array<number> = [];

    for (let i = 0; i < from.length; i++) {
      const aFrom = parseInt(from[i].replace("px", ""));
      const aTo = parseInt(to[i].replace("px", ""));

      result.push(aFrom + (aTo - aFrom) * ratio);
    }

    return result;
  }

  animate(ratio: number) {
    const animateStyles: Array<AnimationData.StyleData> = this.data.styles;

    animateStyles.forEach((aAnimateStyle) => {
      const { propertyName, formatValue, from, to }: AnimationData.StyleData =
        aAnimateStyle;

      const animatedValue: string = this.parseFormatedStyleString(
        formatValue,
        this.getCurrentValuesAsRatio(from, to, ratio)
      );

      this.data.target.style.setProperty(propertyName, animatedValue);
    });
  }

  getAnimator(): AnimatorClosure {
    let startTime: Date | null = null;
    const bezier = BezierEasing(...this.data.bezier);

    const animator: AnimatorClosure = () => {
      if (!startTime) startTime = new Date();
      const elapsedTime: number = (+new Date() - +startTime) / 1000;
      const timeRatio: number = Math.min(elapsedTime / this.data.duration, 1);

      this.animate(bezier(timeRatio));

      return timeRatio === 1;
    };

    return animator;
  }

  play() {
    if (!this.animator) {
      this.animator = this.getAnimator();
    }

    setTimeout(() => {
      requestAnimationFrame(this.runAnimationFrame.bind(this));
    }, this.data.delay * 1000);
  }

  runAnimationFrame() {
    const reqId: number = requestAnimationFrame(
      this.runAnimationFrame.bind(this)
    );
    const isAnimationEnd: boolean = this.animator!();

    if (isAnimationEnd) {
      cancelAnimationFrame(reqId);
      this.animator = null;
    }
  }

  parseFormatedStyleString(fstring: string, values: Array<number>): string {
    const splited: Array<string> = fstring.split("%x");

    values.forEach((aValue, index) => {
      splited.splice(index * 2 + 1, 0, `${aValue}px`);
    });

    return splited.join("");
  }
}
