import { AnimationSequence } from "Animator-Type";
import SequenceAnimator from "../../lib/Animator/SequenceAnimator";
import { getShadowFormatValue, getShadowValue } from "../../lib/shadow/shadow";

function allCardFadeoutAnimation(
  headCard: HTMLElement,
  nameCard: HTMLElement,
  tagCard: HTMLElement
): Array<AnimationSequence.Custom> {
  const headCardTitle = headCard.querySelector(".title-text") as HTMLElement;
  const headCardSubTitle = headCard.querySelector(
    ".sub-title-text"
  ) as HTMLElement;
  const nameCardMask = nameCard.querySelector(".mask")! as HTMLElement;
  const tagCardMask = tagCard.querySelector(".mask")! as HTMLElement;

  return [
    [
      {
        target: tagCardMask,
        styles: [
          {
            prop: "opacity",
            fvalue: "%x",
            from: () => [0],
            to: () => [1],
          },
        ],
        duration: 0.25,
        bezier: "material-accel",
        onStart: ({ target }) => {
          target.style.visibility = "visible";
        },
      },
      {
        target: nameCardMask,
        styles: [
          {
            prop: "opacity",
            fvalue: "%x",
            from: () => [0],
            to: () => [1],
          },
        ],
        duration: 0.25,
        delay: 0.1,
        bezier: "material-accel",
        onStart: ({ target }) => {
          target.style.visibility = "visible";
        },
        onEnd: () => {
          nameCard.innerHTML = "";
        },
      },
      {
        target: headCardTitle,
        styles: [
          {
            prop: "opacity",
            fvalue: "%x",
            from: () => [1],
            to: () => [0],
          },
        ],
        duration: 0.25,
        delay: 0.2,
        bezier: "material-accel",
      },
      {
        target: headCardSubTitle,
        styles: [
          {
            prop: "opacity",
            fvalue: "%x",
            from: () => [1],
            to: () => [0],
          },
        ],
        duration: 0.25,
        delay: 0.2,
        bezier: "material-accel",
        onEnd: () => {
          headCard.innerHTML = "";
        },
      },
    ],
  ];
}

function tagCardHeightNormalizeAnimation(
  tagCard: HTMLElement
): Array<AnimationSequence.Custom> {
  const tagCardHeight: number = tagCard.getBoundingClientRect().height;

  if (tagCardHeight === 135) return [];
  return [
    {
      target: tagCard,
      styles: [
        {
          prop: "height",
          fvalue: "%xpx",
          from: () => [tagCardHeight],
          to: () => [135],
        },
      ],
      duration: 0.35,
      bezier: "material-normal",
      onStart: ({ target }) => {
        target.style.height = `${tagCardHeight}px`;
        target.innerHTML = "";
      },
    },
  ];
}

function allCardsHoverAnimation(
  headCard: HTMLElement,
  nameCard: HTMLElement
): Array<AnimationSequence.Custom> {
  return [
    [
      {
        target: nameCard,
        styles: [
          {
            prop: "box-shadow",
            fvalue: getShadowFormatValue(),
            from: () => [],
            to: () => getShadowValue(4),
          },
        ],
        duration: 0.35,
        bezier: "material-normal",
      },
      {
        target: headCard,
        styles: [
          {
            prop: "box-shadow",
            fvalue: getShadowFormatValue(),
            from: () => [],
            to: () => getShadowValue(5),
          },
        ],
        duration: 0.35,
        delay: 0.12,
        bezier: "material-normal",
      },
    ],
  ];
}

function packAnimation(
  cardContainer: HTMLElement,
  headCard: HTMLElement,
  nameCard: HTMLElement,
  tagCard: HTMLElement
): Array<AnimationSequence.Custom> {
  const cardOriginHeight: number = 135;
  const hoverMargin: number = 20;
  const changeCardPositionsToAbsolute = () => {
    cardContainer.style.display = "";
    cardContainer.style.justifyContent = "";
    cardContainer.style.alignItems = "";

    headCard.style.position = "absolute";
    headCard.style.top = "";
    headCard.style.transform = `translate3d(0, ${
      -headCard.getBoundingClientRect().height / 2 -
      cardOriginHeight -
      hoverMargin
    }px, 0)`;

    nameCard.style.position = "absolute";
    nameCard.style.top = "";
    nameCard.style.transform = "";
    nameCard.style.margin = "";

    tagCard.style.position = "absolute";
    tagCard.style.top = "";
    tagCard.style.transform = `translate3d(0, ${
      -tagCard.getBoundingClientRect().height / 2 +
      cardOriginHeight +
      hoverMargin
    }px, 0)`;

    console.log(tagCard.getBoundingClientRect().height);
  };

  return [
    // Dummy for global delay
    {
      target: tagCard,
      styles: [
        {
          prop: "opacity",
          fvalue: "%x",
          from: () => [1],
          to: () => [1],
        },
      ],
      duration: 0.1,
    },
    [
      {
        target: tagCard,
        styles: [
          {
            prop: "transform",
            fvalue: "translate3d(0, %xpx, 0)",
            from: () => [],
            to: () => [-cardOriginHeight / 2],
          },
        ],
        duration: 0.35,
        bezier: "material-normal",
        onStart: () => {
          changeCardPositionsToAbsolute();
        },
      },
      {
        target: tagCard,
        styles: [
          {
            prop: "box-shadow",
            fvalue: getShadowFormatValue(),
            from: () => [],
            to: () => getShadowValue(0),
          },
        ],
        duration: 0.2,
        delay: 0.35,
        bezier: "material-normal",
      },
      {
        target: headCard,
        styles: [
          {
            prop: "transform",
            fvalue: "translate3d(0, %xpx, 0)",
            from: () => [],
            to: () => [-cardOriginHeight / 2],
          },
        ],
        duration: 0.35,
        delay: 0.2,
        bezier: "material-normal",
      },
      {
        target: nameCard,
        styles: [
          {
            prop: "box-shadow",
            fvalue: getShadowFormatValue(),
            from: () => [],
            to: () => getShadowValue(0),
          },
        ],
        duration: 0.3,
        delay: 0.25,
        bezier: "material-normal",
      },
    ],
  ];
}

export function executeAnimation(
  cardContainer: HTMLElement,
  headCard: HTMLElement,
  nameCard: HTMLElement,
  tagCard: HTMLElement,
  onEnd: () => void = () => {}
) {
  new SequenceAnimator(
    [
      ...allCardFadeoutAnimation(headCard, nameCard, tagCard),
      ...tagCardHeightNormalizeAnimation(tagCard),
      ...allCardsHoverAnimation(headCard, nameCard),
      ...packAnimation(cardContainer, headCard, nameCard, tagCard),
    ],
    () => {
      onEnd();
    }
  ).play();
}
