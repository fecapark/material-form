import { AnimationSequence } from "SequenceAnimator-Type";
import { moveEventStack } from "../../lib/Animator/Animator";
import SequenceAnimator from "../../lib/Animator/SequenceAnimator";

function getFadeOutAniamtion(
  target: HTMLElement
): Array<AnimationSequence.Custom> {
  return [
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
}

function getMaskAnimation(
  masks: NodeListOf<HTMLElement>
): Array<AnimationSequence.Custom> {
  const resultSize = { width: 300, height: 135 };

  const duration = 0.35;
  const bezier: [number, number, number, number] = [0, 0, 0.2, 1];
  const deafultDelay = 0.6;
  const delayGap = 0.18;

  return [
    [
      {
        target: masks[0],
        animation: ({ target }) => {
          target.style.transform = `translateY(calc(-50% - ${resultSize.height}px / 2))`;
        },
        duration: duration,
        delay: deafultDelay,
        bezier,
      },
      {
        target: masks[1],
        animation: ({ target }) => {
          target.style.transform = `translate(calc(50% + ${resultSize.width}px / 2))`;
        },
        duration,
        delay: deafultDelay + delayGap,
        bezier,
      },
      {
        target: masks[2],
        animation: ({ target }) => {
          target.style.transform = `translateY(calc(50% + ${resultSize.height}px / 2))`;
        },
        duration,
        delay: deafultDelay + delayGap * 2,
        bezier,
      },
      {
        target: masks[3],
        animation: ({ target }) => {
          target.style.transform = `translate(calc(-50% - ${resultSize.width}px / 2))`;
        },
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
  moveEventStack(() => {
    const animation = new SequenceAnimator(
      [
        ...getFadeOutAniamtion(
          rootTarget.querySelector("#logo-text-container")!
        ),
        ...getMaskAnimation(rootTarget.querySelectorAll(".mask")),
      ],
      () => whenEnd()
    );
    animation.start();
  });
}
