import { AnimationSequence } from "Animator-Type";
import SequenceAnimator from "../../lib/Animator/SequenceAnimator";

function getFadeInAnimation(
  target: HTMLElement
): Array<AnimationSequence.Custom> {
  return [
    {
      target,
      styles: [
        {
          prop: "opacity",
          fvalue: "%x",
          from: () => [0],
          to: () => [1],
        },
      ],
      duration: 0.3,
      delay: 1,
      bezier: [0.4, 0, 0.2, 1],
    },
  ];
}

function getFadeOutAniamtion(
  target: HTMLElement
): Array<AnimationSequence.Custom> {
  return [
    [
      {
        target,
        styles: [
          {
            prop: "opacity",
            fvalue: "%x",
            from: () => [1],
            to: () => [0],
          },
        ],
        duration: 0.3,
        delay: 3,
        bezier: [0.4, 0, 0.2, 1],
        onEnd: () => {
          target.style.visibility = "hidden";
        },
      },
    ],
  ];
}

function getMaskAnimation(
  masks: NodeListOf<HTMLElement>
): Array<AnimationSequence.Custom> {
  function getBRectFromMask(idx: number): DOMRect {
    return masks[idx].getBoundingClientRect();
  }

  const resultSize = { width: 300, height: 135 };
  const deafultDelay = 0.6;

  const duration = 0.55;
  const delayGap = 0.14;
  const bezier = "super-accel";

  return [
    [
      {
        target: masks[0],
        styles: [
          {
            prop: "transform",
            fvalue: "translate3d(0, %xpx, 0)",
            from: () => [-getBRectFromMask(0).height],
            to: () => [-getBRectFromMask(0).height / 2 - resultSize.height / 2],
          },
        ],
        duration: duration,
        delay: deafultDelay,
        bezier,
      },
      {
        target: masks[1],
        styles: [
          {
            prop: "transform",
            fvalue: "translate3d(%xpx, 0, 0)",
            from: () => [getBRectFromMask(0).width],
            to: () => [getBRectFromMask(0).width / 2 + resultSize.width / 2],
          },
        ],
        duration,
        delay: deafultDelay + delayGap,
        bezier,
      },
      {
        target: masks[2],
        styles: [
          {
            prop: "transform",
            fvalue: "translate3d(0, %xpx, 0)",
            from: () => [getBRectFromMask(0).height],
            to: () => [getBRectFromMask(0).height / 2 + resultSize.height / 2],
          },
        ],
        duration,
        delay: deafultDelay + delayGap * 3,
        bezier,
      },
      {
        target: masks[3],
        styles: [
          {
            prop: "transform",
            fvalue: "translate3d(%xpx, 0, 0)",
            from: () => [-getBRectFromMask(0).width],
            to: () => [-getBRectFromMask(0).width / 2 - resultSize.width / 2],
          },
        ],
        duration,
        delay: deafultDelay + delayGap * 4.5,
        bezier,
      },
    ],
  ];
}

export function executeAnimation(
  rootTarget: HTMLElement,
  isShowedOnce: boolean,
  whenEnd: () => void = () => {}
) {
  new SequenceAnimator(
    [
      ...(isShowedOnce
        ? getFadeInAnimation(rootTarget.querySelector("#logo-text-container")!)
        : []),
      ...getFadeOutAniamtion(rootTarget.querySelector("#logo-text-container")!),
      ...getMaskAnimation(rootTarget.querySelectorAll(".mask")),
    ],
    () => whenEnd()
  ).play();
}
