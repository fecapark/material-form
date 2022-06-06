import { AnimationSequence } from "Animator-Type";
import SequenceAnimator from "../../../lib/Animator/SequenceAnimator";
import {
  getShadowFormatValue,
  getShadowValue,
} from "../../../lib/shadow/shadow";

function iMaskTriggerAnimation(
  headCard: HTMLElement,
  iMask: HTMLElement
): Array<AnimationSequence.Custom> {
  let maskTargetSize: number;

  return [
    [
      {
        target: iMask,
        styles: [
          {
            prop: "width",
            fvalue: "%xpx",
            from: () => [0],
            to: () => [maskTargetSize],
          },
        ],
        duration: 0.5,
        bezier: "material-normal",
        onStart: () => {
          maskTargetSize = Math.sqrt(
            Math.pow(headCard.getBoundingClientRect().width * 2, 2) +
              Math.pow(headCard.getBoundingClientRect().height * 2, 2)
          );
        },
      },
      {
        target: iMask,
        styles: [
          {
            prop: "height",
            fvalue: "%xpx",
            from: () => [0],
            to: () => [maskTargetSize],
          },
        ],
        duration: 0.5,
        bezier: "material-normal",
      },
    ],
  ];
}

function headCardHeightNormalizeAnimation(
  headCard: HTMLElement
): Array<AnimationSequence.Custom> {
  return [
    {
      target: headCard,
      styles: [
        {
          prop: "height",
          fvalue: "%xpx",
          from: () => [headCard.getBoundingClientRect().height],
          to: () => [135],
        },
      ],
      duration: 0.35,
      delay: 0.2,
      bezier: "material-normal",
    },
    {
      target: headCard,
      styles: [
        {
          prop: "box-shadow",
          fvalue: getShadowFormatValue(),
          from: () => [],
          to: () => getShadowValue(0),
        },
      ],
      duration: 0.5,
      bezier: "material-accel",
    },
  ];
}

export function executeAnimation(
  headCard: HTMLElement,
  iMask: HTMLElement,
  onEnd: () => void = () => {}
) {
  new SequenceAnimator(
    [
      ...iMaskTriggerAnimation(headCard, iMask),
      ...headCardHeightNormalizeAnimation(headCard),
    ],
    () => {
      onEnd();
    }
  ).play();
}