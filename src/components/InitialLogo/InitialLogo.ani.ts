import { BezierValue } from "Animator-Type";
import { AnimationSequence } from "SequenceAnimator-Type";
import SequenceAnimator from "../../lib/Animator/SequenceAnimator";

function getFadeOutAniamtion(
  target: HTMLElement
): Array<AnimationSequence.Custom> {
  return [
    {
      target,
      styles: [
        {
          prop: "opacity",
          fvalue: "%x",
          from: [1],
          to: [0],
        },
      ],
      duration: 0.4,
      delay: 3,
      bezier: [0.4, 0, 0.2, 1],
      onEnd: () => {
        target.style.visibility = "hidden";
      },
    },
  ];
}

function getMaskAnimation(
  masks: NodeListOf<HTMLElement>
): Array<AnimationSequence.Custom> {
  function getBRectFromMask(idx: number): DOMRect {
    return masks[idx].getBoundingClientRect();
  }

  // Sizes
  const resultSize = { width: 300, height: 135 };

  // Animation parameters
  const duration = 0.35;
  const deafultDelay = 0.6;
  const delayGap = 0.18;
  const bezier: BezierValue = [0, 0, 0.2, 1];

  return [
    [
      {
        target: masks[0],
        styles: [
          {
            prop: "transform",
            fvalue: "translate3d(0, %xpx, 0)",
            from: [-getBRectFromMask(0).height],
            to: [-getBRectFromMask(0).height / 2 - resultSize.height / 2],
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
            from: [getBRectFromMask(0).width],
            to: [getBRectFromMask(0).width / 2 + resultSize.width / 2],
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
            from: [getBRectFromMask(0).height],
            to: [getBRectFromMask(0).height / 2 + resultSize.height / 2],
          },
        ],
        duration,
        delay: deafultDelay + delayGap * 2,
        bezier,
      },
      {
        target: masks[3],
        styles: [
          {
            prop: "transform",
            fvalue: "translate3d(%xpx, 0, 0)",
            from: [-getBRectFromMask(0).width],
            to: [-getBRectFromMask(0).width / 2 - resultSize.width / 2],
          },
        ],
        duration,
        delay: deafultDelay + delayGap * 3,
        bezier,
      },
    ],
  ];
}

export function executeAnimation(
  rootTarget: HTMLElement,
  whenEnd: () => void = () => {}
) {
  new SequenceAnimator(
    [
      ...getFadeOutAniamtion(rootTarget.querySelector("#logo-text-container")!),
      ...getMaskAnimation(rootTarget.querySelectorAll(".mask")),
    ],
    () => whenEnd()
  ).play();
}
