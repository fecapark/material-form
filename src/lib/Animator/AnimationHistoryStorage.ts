import { HistoryData, ValidatableData } from "AnimationHistory-Type";
import { AnimationData, Nullable } from "Animator-Type";

class HistoryStack {
  datas: Array<HistoryData> = [];

  public popBy(key: (data: HistoryData) => boolean): HistoryData | Nullable {
    return this.datas
      .filter((aHistoryData) => {
        return key(aHistoryData);
      })
      .pop();
  }

  public pushAsUniqueData(
    data: HistoryData,
    isSameData: (data: HistoryData) => boolean
  ) {
    this.datas = this.datas.filter((aHistoryData) => {
      return !isSameData(aHistoryData);
    });

    this.datas.push(data);
  }
}

export default class AnimationHistoryStorage {
  private historyStack: HistoryStack = new HistoryStack();

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
    toFindData: AnimationData.StyleData
  ): HistoryData | Nullable {
    const { prop, fvalue }: { prop: string; fvalue: string } = toFindData;

    return this.historyStack.popBy((aHistoryData) =>
      this.isFindingData(aHistoryData, { target, prop, fvalue })
    );
  }

  public push(aAnimationData: AnimationData.Parsed) {
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
