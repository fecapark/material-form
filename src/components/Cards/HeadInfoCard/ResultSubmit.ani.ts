import { AnimationSequence } from "Animator-Type";
import { getDummyAnimationData } from "../../../lib/Animator/Animator";
import SequenceAnimator from "../../../lib/Animator/SequenceAnimator";
import {
  getShadowFormatValue,
  getShadowValue,
} from "../../../lib/shadow/shadow";

function disableButtonAnimation(
  resultProfileContainer: HTMLElement
): Array<AnimationSequence.Custom> {
  const submitButton: HTMLElement =
    resultProfileContainer.querySelector(".circle-button")!;
  const sbIcon: HTMLElement = submitButton.querySelector("i")!;

  return [
    {
      target: sbIcon,
      styles: [
        {
          prop: "opacity",
          fvalue: "%x",
          from: () => [1],
          to: () => [0],
        },
      ],
      duration: 0.2,
    },
    [
      {
        target: submitButton,
        styles: [
          {
            prop: "width",
            fvalue: "%x%",
            from: () => [],
            to: () => [0],
          },
        ],
        duration: 0.3,
        bezier: "material-accel",
      },
      {
        target: submitButton,
        styles: [
          {
            prop: "height",
            fvalue: "%x%",
            from: () => [],
            to: () => [0],
          },
        ],
        duration: 0.3,
        bezier: "material-accel",
      },
      {
        target: submitButton,
        styles: [
          {
            prop: "font-size",
            fvalue: "%xpx",
            from: () => [],
            to: () => [0],
          },
        ],
        duration: 0.2,
        bezier: "material-accel",
      },
    ],
  ];
}

function fadeoutContentAnimation(
  headCard: HTMLElement,
  resultProfileContainer: HTMLElement
): Array<AnimationSequence.Custom> {
  const infoTagContainer: HTMLElement = resultProfileContainer.querySelector(
    ".info-tag-container"
  )!;
  const infoNameContainer: HTMLElement = resultProfileContainer.querySelector(
    ".info-name-container"
  )!;
  const backButtonWrapper: HTMLElement = resultProfileContainer.querySelector(
    ".back-button-wrapper"
  )!;

  return [
    getDummyAnimationData(0.2),
    [
      {
        target: infoTagContainer,
        styles: [
          {
            prop: "opacity",
            fvalue: "%x",
            from: () => [1],
            to: () => [0],
          },
        ],
        duration: 0.3,
        bezier: "material-normal",
        onEnd: ({ target }) => {
          target.style.visibility = "hidden";
        },
      },
      {
        target: infoNameContainer,
        styles: [
          {
            prop: "opacity",
            fvalue: "%x",
            from: () => [1],
            to: () => [0],
          },
        ],
        duration: 0.3,
        delay: 0.1,
        bezier: "material-normal",
        onEnd: ({ target }) => {
          target.style.visibility = "hidden";
        },
      },
      {
        target: backButtonWrapper,
        styles: [
          {
            prop: "opacity",
            fvalue: "%x",
            from: () => [1],
            to: () => [0],
          },
        ],
        duration: 0.3,
        delay: 0.2,
        bezier: "material-normal",
        onEnd: ({ target }) => {
          target.style.visibility = "hidden";
        },
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
        duration: 0.4,
        delay: 0.1,
        bezier: "material-normal",
      },
    ],
  ];
}

function flipAnimation(
  resultProfileContainer: HTMLElement
): Array<AnimationSequence.Custom> {
  const createFlipBlocks = (num: number): Array<HTMLElement> => {
    const flipBlocks: Array<HTMLElement> = [];

    for (let i = 0; i < num; i++) {
      const bRect: DOMRect = resultProfileContainer.getBoundingClientRect();
      const flipBlock: HTMLDivElement = document.createElement("div");
      flipBlock.classList.add("flip-block");
      flipBlock.style.width = `${bRect.width}px`;
      flipBlock.style.height = `${bRect.height / num}px`;

      const front: HTMLDivElement = document.createElement("div");
      front.classList.add("front");

      const back: HTMLDivElement = document.createElement("div");
      back.classList.add("back");

      flipBlock.appendChild(front);
      flipBlock.appendChild(back);

      flipBlocks.push(flipBlock);
    }

    return flipBlocks;
  };

  const getFlipAnimation = (
    element: HTMLElement,
    duration: number,
    startDelay: number
  ) => {
    const hoverShadowDuration: number = 0.05;
    const flipHoverDurationRatio: number = 0.2;

    return [
      {
        target: element,
        styles: [
          {
            prop: "transform",
            fvalue: "rotate3d(1, 0, 0, %xdeg)",
            from: () => [0],
            to: () => [-180],
          },
        ],
        duration: duration,
        delay: startDelay,
        bezier: "super-accel",
      },
      {
        target: element,
        styles: [
          {
            prop: "box-shadow",
            fvalue: "0 %xpx %xpx %xpx rgba(0, 0, 0, %x)",
            from: () => [0, 0, 0, 0],
            to: () => [4.5, 15, -3.5, 0.5],
          },
        ],
        duration: hoverShadowDuration,
        delay: startDelay,
      },
      {
        target: element,
        styles: [
          {
            prop: "box-shadow",
            fvalue: "0 %xpx %xpx %xpx rgba(0, 0, 0, %x)",
            from: () => [],
            to: () => [36, 33.75, -22.5, 0.5],
          },
        ],
        duration: (duration - hoverShadowDuration) * flipHoverDurationRatio,
        delay: startDelay + hoverShadowDuration,
      },
      {
        target: element,
        styles: [
          {
            prop: "box-shadow",
            fvalue: "0 %xpx %xpx %xpx rgba(0, 0, 0, %x)",
            from: () => [],
            to: () => [0, 0, 0, 0],
          },
        ],
        duration: (duration - hoverShadowDuration) * flipHoverDurationRatio,
        delay:
          startDelay +
          hoverShadowDuration +
          (duration - hoverShadowDuration) * flipHoverDurationRatio,
      },
    ];
  };

  const flipBlocks: Array<HTMLElement> = createFlipBlocks(3);
  const flipDuration: number = 1;
  const flipGap: number = 0.1;

  return [
    {
      target: resultProfileContainer,
      styles: [
        {
          prop: "opacity",
          fvalue: "%x",
          from: () => [1],
          to: () => [1],
        },
      ],
      duration: 0.3,
      onStart: ({ target }) => {
        target.innerHTML = "";

        target.style.display = "flex";
        target.style.flexWrap = "nowrap";
        target.style.padding = "0";
        target.style.perspective = "100vw";
        target.style.perspectiveOrigin = "50% 50%";
        target.style.backgroundColor = "#eeedef";

        flipBlocks.forEach((aFlipBlock) => target.appendChild(aFlipBlock));
      },
    },
    flipBlocks
      .map((aFlipBlock, idx) =>
        getFlipAnimation(aFlipBlock, flipDuration, flipGap * idx)
      )
      .flat(),
  ];
}

export function executeAnimation(
  headCard: HTMLElement,
  resultProfileContainer: HTMLElement,
  onEnd: () => void = () => {}
) {
  new SequenceAnimator(
    [
      ...disableButtonAnimation(resultProfileContainer),
      ...fadeoutContentAnimation(headCard, resultProfileContainer),
      ...flipAnimation(resultProfileContainer),
    ],
    () => {
      onEnd();
    }
  ).play();
}
