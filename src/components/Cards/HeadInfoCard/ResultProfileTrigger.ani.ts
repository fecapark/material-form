import { AnimationData, AnimationSequence } from "Animator-Type";
import SequenceAnimator from "../../../lib/Animator/SequenceAnimator";
import {
  getShadowFormatValue,
  getShadowValue,
} from "../../../lib/shadow/shadow";

function unHoverAndTriggerMaskAndResultApperAnimation(
  headCard: HTMLElement,
  darkMask: HTMLElement,
  subMask: HTMLElement
): Array<AnimationSequence.Custom> {
  const calculateTargetSize = (): number => {
    const { width, height }: { width: number; height: number } =
      headCard.getBoundingClientRect();
    return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) * 1.02;
  };
  const setResultProfileSize = () => {
    const { width, height }: { width: number; height: number } =
      headCard.getBoundingClientRect();
    const resultProfile: HTMLElement = headCard.querySelector(
      ".result-profile-container"
    )!;

    resultProfile.style.width = `${width}px`;
    resultProfile.style.height = `${height}px`;
  };

  return [
    [
      {
        target: headCard,
        styles: [
          {
            prop: "box-shadow",
            fvalue: getShadowFormatValue(),
            from: () => [],
            to: () => getShadowValue(2),
          },
        ],
        duration: 0.3,
        bezier: "material-normal",
      },
      {
        target: darkMask,
        styles: [
          {
            prop: "width",
            fvalue: "%xpx",
            from: () => [0],
            to: () => [calculateTargetSize()],
          },
          {
            prop: "height",
            fvalue: "%xpx",
            from: () => [0],
            to: () => [calculateTargetSize()],
          },
        ],
        duration: 0.5,
        delay: 0.15,
        bezier: "material-normal",
        onStart: () => {
          headCard.style.alignItems = "center";
          setResultProfileSize();
        },
        onEnd: () => {
          headCard.style.backgroundColor = "white";
        },
      },
      {
        target: subMask,
        styles: [
          {
            prop: "width",
            fvalue: "%xpx",
            from: () => [0],
            to: () => [calculateTargetSize()],
          },
          {
            prop: "height",
            fvalue: "%xpx",
            from: () => [0],
            to: () => [calculateTargetSize()],
          },
        ],
        duration: 0.325,
        delay: 0.6,
        bezier: "material-accel",
      },
      ...resultProfileAppearMixin(headCard, darkMask, subMask),
    ],
  ];
}

function resultProfileAppearMixin(
  headCard: HTMLElement,
  darkMask: HTMLElement,
  subMask: HTMLElement
): Array<AnimationData.Custom> {
  const switchResultProfileWithMask = () => {
    darkMask.remove();
    subMask.remove();
    headCard.appendChild(resultProfileContainer);

    headCard.style.padding = "0";
    resultProfileContainer.style.backgroundColor = "white";
    resultProfileContainer.style.width = "100%";
    resultProfileContainer.style.height = "100%";
  };

  const resultProfileContainer: HTMLDivElement = subMask.querySelector(
    ".result-profile-container"
  )!;
  const backButton: HTMLElement = resultProfileContainer.querySelector(
    ".back-button-wrapper"
  )!;
  const infoName: HTMLElement =
    resultProfileContainer.querySelector(".info-name")!;
  const infoRemember: HTMLElement =
    resultProfileContainer.querySelector(".info-remember")!;

  return [
    {
      target: backButton,
      styles: [
        {
          prop: "opacity",
          fvalue: "%x",
          from: () => [0],
          to: () => [1],
        },
        {
          prop: "transform",
          fvalue: "translate3d(%xpx, %xpx, 0)",
          from: () => [15, 12],
          to: () => [0, 0],
        },
      ],
      duration: 0.45,
      delay: 0.7,
      bezier: "material-normal",
    },
    {
      target: infoName,
      styles: [
        {
          prop: "opacity",
          fvalue: "%x",
          from: () => [0],
          to: () => [1],
        },
        {
          prop: "transform",
          fvalue: "translate3d(0, %xpx, 0)",
          from: () => [8],
          to: () => [0],
        },
      ],
      duration: 0.45,
      delay: 0.75,
      bezier: "material-normal",
    },
    {
      target: infoRemember,
      styles: [
        {
          prop: "opacity",
          fvalue: "%x",
          from: () => [0],
          to: () => [1],
        },
        {
          prop: "transform",
          fvalue: "translate3d(0, %xpx, 0)",
          from: () => [11],
          to: () => [0],
        },
      ],
      duration: 0.45,
      delay: 0.8,
      bezier: "material-normal",
      onEnd: () => {
        switchResultProfileWithMask();
      },
    },
  ];
}

function appearTagInfoAnimation(
  headCard: HTMLElement
): Array<AnimationSequence.Custom> {
  const dividor: HTMLElement = headCard.querySelector(
    ".result-profile-container > .dividor"
  )!;
  const infoTagContainer: HTMLElement = headCard.querySelector(
    ".result-profile-container > .info-tag-container"
  )!;

  return [
    [
      {
        target: headCard,
        styles: [
          {
            prop: "height",
            fvalue: "%xpx",
            from: () => [headCard.getBoundingClientRect().height],
            to: () => {
              return [
                headCard.getBoundingClientRect().height +
                  infoTagContainer.getBoundingClientRect().height +
                  40,
              ];
            },
          },
        ],
        duration: 0.35,
        delay: 0.3,
        bezier: "material-normal",
      },
      {
        target: dividor,
        styles: [
          {
            prop: "opacity",
            fvalue: "%x",
            from: () => [0],
            to: () => [1],
          },
        ],
        duration: 0.35,
        bezier: "material-normal",
        delay: 0.5,
      },
      {
        target: infoTagContainer.querySelector(".tag-block-container")!,
        styles: [
          {
            prop: "opacity",
            fvalue: "%x",
            from: () => [0],
            to: () => [1],
          },
          {
            prop: "transform",
            fvalue: "translate3d(0, %xpx, 0)",
            from: () => [-15],
            to: () => [0],
          },
        ],
        duration: 0.45,
        delay: 0.55,
        bezier: "material-normal",
      },
      {
        target: infoTagContainer.querySelector(".info-tag-text")!,
        styles: [
          {
            prop: "opacity",
            fvalue: "%x",
            from: () => [0],
            to: () => [1],
          },
          {
            prop: "transform",
            fvalue: "translate3d(0, %xpx, 0)",
            from: () => [-10],
            to: () => [0],
          },
        ],
        duration: 0.45,
        delay: 0.68,
        bezier: "material-normal",
      },
    ],
  ];
}

export function executeAnimation(
  headCard: HTMLElement,
  darkMask: HTMLElement,
  subMask: HTMLElement
) {
  new SequenceAnimator([
    ...unHoverAndTriggerMaskAndResultApperAnimation(
      headCard,
      darkMask,
      subMask
    ),
    ...appearTagInfoAnimation(headCard),
  ]).play();
}
