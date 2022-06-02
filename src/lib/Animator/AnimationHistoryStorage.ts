import {
  AbstractAnimationHistoryStorage,
  HistoryData,
  ValidatableData,
} from "AnimationHistory-Type";
import { AnimationData } from "Animator-Type";

class HistoryStack {
  private static datas: Array<HistoryData> = [];

  get length(): number {
    return HistoryStack.datas.length;
  }

  public popBy(key: (data: HistoryData) => boolean): HistoryData | undefined {
    return HistoryStack.datas
      .filter((aHistoryData) => {
        return key(aHistoryData);
      })
      .pop();
  }

  public pushAsUniqueData(
    data: HistoryData,
    isSameData: (data: HistoryData) => boolean
  ) {
    HistoryStack.datas = HistoryStack.datas.filter((aHistoryData) => {
      return !isSameData(aHistoryData);
    });

    HistoryStack.datas.push(data);
  }
}

export default class AnimationHistoryStorage
  implements AbstractAnimationHistoryStorage
{
  private historyStack: HistoryStack = new HistoryStack();

  get length(): number {
    return this.historyStack.length;
  }

  private isFindingData(
    historyData: HistoryData,
    keyData: ValidatableData
  ): boolean {
    return (
      historyData.target === keyData.target &&
      historyData.prop === keyData.prop &&
      historyData.fvalue === keyData.fvalue
    );
  }

  public find(
    target: HTMLElement,
    prop: string,
    fvalue: string
  ): HistoryData | undefined {
    return this.historyStack.popBy((aHistoryData) =>
      this.isFindingData(aHistoryData, { target, prop, fvalue })
    );
  }

  public push(aAnimationData: AnimationData.Custom | AnimationData.Parsed) {
    const {
      target,
      styles,
    }: { target: HTMLElement; styles: Array<AnimationData.StyleData> } =
      aAnimationData;

    styles.forEach((aStyleData) => {
      const { prop, fvalue, from, to }: AnimationData.StyleData = aStyleData;
      this.historyStack.pushAsUniqueData(
        { target, prop, fvalue, from, to },
        (aHistoryData) => {
          return this.isFindingData(aHistoryData, { target, prop, fvalue });
        }
      );
    });
  }
}
