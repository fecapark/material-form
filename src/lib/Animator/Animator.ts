import BezierEasing from "bezier-easing";
import { AnimationData, AnimatorClosure, BezierValue } from "Animator-Type";
import { AbstractAnimationHistoryStorage } from "AnimationHistory-Type";

const BEZIER_EASING_MAP: Record<string, BezierValue> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  "material-normal": [0.4, 0, 0.2, 1],
  "material-accel": [0, 0, 0.2, 1],
};

export default class Animator {
  private data: AnimationData.Parsed;
  private preFromValues: Array<Array<number>> = [];
  private preToValues: Array<Array<number>> = [];
  private animator: AnimatorClosure = null;

  constructor(
    customData: AnimationData.Custom,
    private readonly moreOnEnd: () => void = () => {},
    private readonly animationHistoryStorage: AbstractAnimationHistoryStorage
  ) {
    this.data = this.parseData(customData);
  }

  private parseData(customData: AnimationData.Custom): AnimationData.Parsed {
    function checkDataFormat(data: AnimationData.Parsed) {
      data.styles.forEach((aStyleData) => {
        console.log();
        const { fvalue, from, to }: AnimationData.StyleData = aStyleData;
        const fromValues: Array<number> = from();
        const toValues: Array<number> = to();

        if (fvalue.count("%x") !== fromValues.length) {
          throw RangeError(
            `You must set amount of from values same as format keywords. (from: ${
              fromValues.length
            }, format('%x'): ${fvalue.count("%x")})`
          );
        }

        if (fromValues.length !== toValues.length) {
          throw RangeError(
            "Animation from and to value must be matched one-to-one."
          );
        }
      });
    }

    const parseStylesAsHistoryData = (): Array<AnimationData.StyleData> => {
      return customData.styles.map((aStyleData) => {
        const { prop, fvalue, from }: AnimationData.StyleData = aStyleData;
        const fromValues: Array<number> = from();

        if (fvalue.includes("%x") && fromValues.length === 0) {
          const historyData = this.animationHistoryStorage.find(
            customData.target,
            prop,
            fvalue
          );

          if (!historyData)
            throw TypeError(
              "You must set 'from' values for initial animation data."
            );

          aStyleData.from = () => [...historyData.to()];
        }

        return aStyleData;
      });
    };

    const bezierValue =
      typeof customData.bezier === "string"
        ? BEZIER_EASING_MAP[customData.bezier]
        : customData.bezier ?? BEZIER_EASING_MAP["linear"];

    const resultData = {
      target: customData.target,
      styles: parseStylesAsHistoryData(),
      duration: customData.duration,
      delay: customData.delay ?? 0,
      bezier: bezierValue,
      onStart: customData.onStart ?? (() => {}),
      onEnd: customData.onEnd ?? (() => {}),
      pauseOnEnd: customData.pauseOnEnd ?? false,
    };

    checkDataFormat(resultData);

    return resultData;
  }

  private getCurrentValuesAsRatio(
    valueIndex: number,
    ratio: number
  ): Array<number> {
    const result: Array<number> = [];

    for (let i = 0; i < this.preFromValues[valueIndex].length; i++) {
      const aFrom = this.preFromValues[valueIndex][i];
      const aTo = this.preToValues[valueIndex][i];

      result.push(aFrom + (aTo - aFrom) * ratio);
    }

    return result;
  }

  private animate(ratio: number) {
    const animateStyles: Array<AnimationData.StyleData> = this.data.styles;

    animateStyles.forEach((aAnimateStyle, index) => {
      const { prop, fvalue }: AnimationData.StyleData = aAnimateStyle;

      const animatedValue: string = this.parseFormatedStyleString(
        fvalue,
        this.getCurrentValuesAsRatio(index, ratio)
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

  private preCalculateValues() {
    this.data.styles.forEach((aStyleData) => {
      const { from, to }: AnimationData.StyleData = aStyleData;

      this.preFromValues.push(from());
      this.preToValues.push(to());
    });
  }

  public play() {
    const { onStart, target }: AnimationData.Parsed = this.data;
    this.animator = this.animator ?? this.getAnimator();

    setTimeout(() => {
      requestAnimationFrame(() => {
        onStart({ target });
        this.preCalculateValues();
        this.runAnimationFrame();
      });
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
