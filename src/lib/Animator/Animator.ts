import BezierEasing from "bezier-easing";
import { AnimationData, AnimatorClosure, BezierValue } from "Animator-Type";

const BEZIER_EASING_MAP: Record<string, BezierValue> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "material-normal": [0.4, 0, 0.2, 1],
  "material-accel": [0, 0, 0.2, 1],
};

export default class Animator {
  private data: AnimationData.Parsed;
  private animator: AnimatorClosure = null;

  constructor(
    customData: AnimationData.Custom,
    private readonly moreOnEnd: () => void = () => {}
  ) {
    this.data = this.parseData(customData);
  }

  private parseData(customData: AnimationData.Custom): AnimationData.Parsed {
    function checkDataFormat() {
      customData.styles.forEach((aStyleData) => {
        const { from, to }: { from: Array<number>; to: Array<number> } =
          aStyleData;

        if (from.length !== to.length) {
          throw RangeError(
            "Animation from and to value must be matched one-to-one."
          );
        }
      });
    }

    checkDataFormat();

    const bezierValue =
      typeof customData.bezier === "string"
        ? BEZIER_EASING_MAP[customData.bezier]
        : customData.bezier ?? BEZIER_EASING_MAP["linear"];

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

  private getCurrentValuesAsRatio(
    from: Array<number>,
    to: Array<number>,
    ratio: number
  ): Array<number> {
    const result: Array<number> = [];

    for (let i = 0; i < from.length; i++) {
      const aFrom = from[i];
      const aTo = to[i];

      result.push(aFrom + (aTo - aFrom) * ratio);
    }

    return result;
  }

  private animate(ratio: number) {
    const animateStyles: Array<AnimationData.StyleData> = this.data.styles;

    animateStyles.forEach((aAnimateStyle) => {
      const { prop, fvalue, from, to }: AnimationData.StyleData = aAnimateStyle;

      const animatedValue: string = this.parseFormatedStyleString(
        fvalue,
        this.getCurrentValuesAsRatio(from, to, ratio)
      );

      this.data.target.style.setProperty(prop, animatedValue);
    });
  }

  private getAnimator(): AnimatorClosure {
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

  private parseFormatedStyleString(
    fstring: string,
    values: Array<number>
  ): string {
    const splited: Array<string> = fstring.split("%x");

    values.forEach((aValue, index) => {
      splited.splice(index * 2 + 1, 0, aValue.toString());
    });

    return splited.join("");
  }

  public play() {
    this.animator = this.animator ?? this.getAnimator();

    setTimeout(() => {
      requestAnimationFrame(this.runAnimationFrame.bind(this));
    }, this.data.delay * 1000);
  }

  public runAnimationFrame() {
    const reqId: number = requestAnimationFrame(
      this.runAnimationFrame.bind(this)
    );

    if (!this.animator || this.animator()) {
      cancelAnimationFrame(reqId);
      this.animator = null;

      this.data.onEnd({ target: this.data.target });
      this.moreOnEnd();
    }
  }
}
