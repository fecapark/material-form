// import { setShadow } from "../../lib/shadow/shadow";
import { AnimationSequence } from "Animator-Type";
import SequenceAnimator from "../../lib/Animator/SequenceAnimator";
import { getShadowFormatValue, getShadowValue } from "../../lib/shadow/shadow";

function getHeadCardTextFadeInAnimation(
  headCard: HTMLElement
): Array<AnimationSequence.Custom> {
  return [
    [
      {
        target: headCard.querySelector(".title-text")!,
        styles: [
          {
            prop: "opacity",
            fvalue: "%x",
            from: () => [0],
            to: () => [1],
          },
        ],
        duration: 0.6,
        bezier: "ease",
        delay: 0.2,
      },
    ],
    {
      target: headCard.querySelector(".sub-title-text")!,
      styles: [
        {
          prop: "opacity",
          fvalue: "%x",
          from: () => [0],
          to: () => [1],
        },
      ],
      duration: 0.6,
      bezier: "ease",
      delay: 0.15,
    },
  ];
}

function getHoverSplitAnimation(
  headCard: HTMLElement,
  nameCard: HTMLElement,
  tagCard: HTMLElement
): Array<AnimationSequence.Custom> {
  const hoverMargin: number = 20;

  return [
    {
      target: headCard,
      styles: [
        {
          prop: "box-shadow",
          fvalue: getShadowFormatValue(),
          from: () => getShadowValue(0),
          to: () => getShadowValue(5),
        },
      ],
      duration: 0.3,
      delay: 0.25,
      bezier: "material-normal",
    },
    [
      {
        target: headCard,
        styles: [
          {
            prop: "transform",
            fvalue: "translate3d(0, %xpx, 0)",
            from: () => [-headCard.getBoundingClientRect().height / 2],
            to: () => [
              -headCard.getBoundingClientRect().height / 2 - 135 - hoverMargin,
            ],
          },
        ],
        duration: 0.35,
        delay: 0.1,
        bezier: "material-normal",
      },
      {
        target: nameCard,
        styles: [
          {
            prop: "box-shadow",
            fvalue: getShadowFormatValue(),
            from: () => getShadowValue(0),
            to: () => getShadowValue(4),
          },
        ],
        duration: 0.3,
        delay: 0.2,
        bezier: "material-normal",
      },
    ],
    {
      target: tagCard,
      styles: [
        {
          prop: "box-shadow",
          fvalue: getShadowFormatValue(),
          from: () => getShadowValue(0),
          to: () => getShadowValue(2),
        },
        {
          prop: "transform",
          fvalue: "translate3d(0, %xpx, 0)",
          from: () => [-headCard.getBoundingClientRect().height / 2],
          to: () => [
            -headCard.getBoundingClientRect().height / 2 + 135 + hoverMargin,
          ],
        },
      ],
      duration: 0.35,
      bezier: "material-normal",
    },
  ];
}

function getHoverDownAnimation(
  headCard: HTMLElement,
  nameCard: HTMLElement
): Array<AnimationSequence.Custom> {
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
        delay: 0.1,
        bezier: "material-normal",
      },
      {
        target: nameCard,
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
    ],
  ];
}

function switchToFlexStyles(
  cardContainer: HTMLElement,
  headCard: HTMLElement,
  nameCard: HTMLElement,
  tagCard: HTMLElement
) {
  // Set card container flex-box
  cardContainer.style.display = "flex";
  cardContainer.style.flexDirection = "column-reverse";
  cardContainer.style.justifyContent = "center";

  headCard.style.position = "relative";
  headCard.style.top = "0";
  headCard.style.transform = "translate3d(0, 0, 0)";

  nameCard.style.position = "relative";
  nameCard.style.top = "0";
  nameCard.style.transform = "translate3d(0, 0, 0)";
  nameCard.style.margin = "20px 0";

  tagCard.style.position = "relative";
  tagCard.style.top = "0";
  tagCard.style.transform = "translate3d(0, 0, 0)";
  tagCard.style.height = "auto";
}

export function executeAnimation(
  cardContainer: HTMLElement,
  headCard: HTMLElement,
  nameCard: HTMLElement,
  tagCard: HTMLElement,
  whenEnd: () => void = () => {}
) {
  new SequenceAnimator(
    [
      ...getHeadCardTextFadeInAnimation(headCard),
      ...getHoverSplitAnimation(headCard, nameCard, tagCard),
      ...getHoverDownAnimation(headCard, nameCard),
    ],
    () => {
      whenEnd();
      switchToFlexStyles(cardContainer, headCard, nameCard, tagCard);
    }
  ).play();
}
