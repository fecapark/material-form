import { AnimationSequence } from "SequenceAnimator-Type";
import { setShadow } from "../../lib/shadow/shadow";
import SequenceAnimator from "../../lib/Animator/SequenceAnimator";

function getHeadCardTextFadeInAnimation(
  headCard: HTMLElement
): Array<AnimationSequence.Custom> {
  return [
    {
      target: headCard.querySelector(".title-text")!,
      styles: [
        {
          propertyName: "opacity",
          formatValue: "%x",
          from: [0],
          to: [1],
        },
      ],
      duration: 0.6,
      bezier: [0.25, 0, 0.2, 1],
    },
    {
      target: headCard.querySelector(".sub-title-text")!,
      styles: [
        {
          propertyName: "opacity",
          formatValue: "%x",
          from: [0],
          to: [1],
        },
      ],
      duration: 0.6,
      bezier: [0.25, 0, 0.2, 1],
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
      // Use setShadow(target, 3)
      styles: [
        {
          propertyName: "box-shadow",
          formatValue:
            "0 %xpx %xpx rgba(0, 0, 0, %x), 0 %xpx %xpx rgba(0, 0, 0, %x)",
          from: [0, 0, 0, 0, 0, 0],
          to: [10, 20, 0.19, 6, 6, 0.23],
        },
      ],
      duration: 0.3,
      delay: 0.2,
      bezier: [0.4, 0, 0.2, 1],
    },
    [
      {
        target: headCard,
        styles: [
          {
            propertyName: "transform",
            formatValue: "translate3d(0, %xpx, 0)",
            from: [-headCard.getBoundingClientRect().height / 2],
            to: [
              -headCard.getBoundingClientRect().height / 2 - 135 - hoverMargin,
            ],
          },
        ],
        duration: 0.35,
        delay: 0.2,
        bezier: [0.4, 0, 0.2, 1],
      },
      {
        target: nameCard,
        // Use setShadow(target, 2)
        styles: [
          {
            propertyName: "box-shadow",
            formatValue:
              "0 %xpx %xpx rgba(0, 0, 0, %x), 0 %xpx %xpx rgba(0, 0, 0, %x)",
            from: [0, 0, 0, 0, 0, 0],
            to: [3, 6, 0.16, 3, 6, 0.23],
          },
        ],
        duration: 0.3,
        delay: 0.3,
        bezier: [0.4, 0, 0.2, 1],
      },
    ],
    {
      target: tagCard,
      styles: [
        {
          propertyName: "box-shadow",
          formatValue:
            "0 %xpx %xpx rgba(0, 0, 0, %x), 0 %xpx %xpx rgba(0, 0, 0, %x)",
          from: [0, 0, 0, 0, 0, 0],
          to: [1, 3, 0.13, 1, 3, 0.23],
        },
        {
          propertyName: "transform",
          formatValue: "translate3d(0, %xpx, 0)",
          from: [-headCard.getBoundingClientRect().height / 2],
          to: [
            -headCard.getBoundingClientRect().height / 2 + 135 + hoverMargin,
          ],
        },
      ],
      duration: 0.35,
      bezier: [0.4, 0, 0.2, 1],
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
            propertyName: "box-shadow",
            formatValue:
              "0 %xpx %xpx rgba(0, 0, 0, %x), 0 %xpx %xpx rgba(0, 0, 0, %x)",
            from: [10, 20, 0.19, 6, 6, 0.23],
            to: [1, 3, 0.13, 1, 3, 0.23],
          },
        ],
        duration: 0.3,
        delay: 0.1,
        bezier: [0.4, 0, 0.2, 1],
      },
      {
        target: nameCard,
        styles: [
          {
            propertyName: "box-shadow",
            formatValue:
              "0 %xpx %xpx rgba(0, 0, 0, %x), 0 %xpx %xpx rgba(0, 0, 0, %x)",
            from: [3, 6, 0.16, 3, 6, 0.23],
            to: [1, 3, 0.13, 1, 3, 0.23],
          },
        ],
        duration: 0.3,
        bezier: [0.4, 0, 0.2, 1],
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
  return () => {
    // Set card container flex-box
    cardContainer.style.display = "flex";
    cardContainer.style.flexDirection = "column-reverse";
    cardContainer.style.justifyContent = "center";

    // All card position to 'static' (default)
    headCard.style.position = "static";
    headCard.style.transform = "translate3d(0, 0, 0)";

    nameCard.style.position = "static";
    nameCard.style.transform = "translate3d(0, 0, 0)";
    nameCard.style.margin = "20px 0";

    tagCard.style.position = "static";
    tagCard.style.transform = "translate3d(0, 0, 0)";
  };
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
