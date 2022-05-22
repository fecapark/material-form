import { UserAnimationLineData } from "SequenceAnimator-Type";
import SequenceAnimator from "../../lib/Animator/SequenceAnimator";

function getFadeOutAniamtion(
  target: HTMLElement
): Array<UserAnimationLineData> {
  const fadeOutSequence: Array<UserAnimationLineData> = [
    {
      target,
      animation: ({ target }) => {
        target.style.opacity = "0";
        target.style.visibility = "hidden";
      },
      duration: 0.4,
      delay: 3,
      bezier: [0.4, 0, 0.2, 1],
    },
  ];

  return fadeOutSequence;
}

function getMaskAnimation(
  masks: NodeListOf<HTMLElement>
): Array<Array<UserAnimationLineData>> {
  const resultSize = { width: 300, height: 135 };
  const deafultDelay = 0.6;
  const delayGap = 0.18;

  const topMaskSequence: Array<UserAnimationLineData> = [
    {
      target: masks[0],
      animation: ({ target }) => {
        target.style.transform = `translateY(calc(-50% - ${resultSize.height}px / 2))`;
      },
      duration: 0.35,
      delay: deafultDelay,
      bezier: [0, 0, 0.2, 1],
    },
  ];

  const rightMaskSequence: Array<UserAnimationLineData> = [
    {
      target: masks[1],
      animation: ({ target }) => {
        target.style.transform = `translateX(calc(50% + ${resultSize.width}px / 2))`;
      },
      duration: 0.35,
      delay: deafultDelay + delayGap,
      bezier: [0, 0, 0.2, 1],
    },
  ];

  const bottomMaskSequence: Array<UserAnimationLineData> = [
    {
      target: masks[2],
      animation: ({ target }) => {
        target.style.transform = `translateY(calc(50% + ${resultSize.height}px / 2))`;
      },
      duration: 0.35,
      delay: deafultDelay + delayGap * 2,
      bezier: [0, 0, 0.2, 1],
    },
  ];

  const leftMaskSequence: Array<UserAnimationLineData> = [
    {
      target: masks[3],
      animation: ({ target }) => {
        target.style.transform = `translateX(calc(-50% - ${resultSize.width}px / 2))`;
      },
      duration: 0.35,
      delay: deafultDelay + delayGap * 3,
      bezier: [0, 0, 0.2, 1],
    },
  ];

  return [
    topMaskSequence,
    rightMaskSequence,
    bottomMaskSequence,
    leftMaskSequence,
  ];
}

export function executeAnimation(rootTarget: HTMLElement) {
  const seq1 = new SequenceAnimator(
    getFadeOutAniamtion(rootTarget.querySelector("#logo-text-container")!),
    () => {
      maskSequences.forEach((aMaskSequence) => aMaskSequence.start());
    }
  );
  const maskSequences = getMaskAnimation(
    rootTarget.querySelectorAll(".mask")
  ).map((aMaskSequence) => new SequenceAnimator(aMaskSequence));

  seq1.start();
}
