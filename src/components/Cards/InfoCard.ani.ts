import { AnimationSequence } from "SequenceAnimator-Type";
import { setShadow } from "../../lib/shadow/shadow";
import SequenceAnimator from "../../lib/Animator/SequenceAnimator";

function getHeadCardInitShadowAnimation(
  headCard: HTMLElement
): Array<AnimationSequence.Custom> {
  return [
    {
      target: headCard,
      animation: ({ target }) => {
        setShadow(target, 1);
      },
      duration: 0.3,
      delay: 0.2,
      bezier: [0.4, 0, 0.2, 1],
    },
  ];
}

function getHeadCardTextFadeInAnimation(
  headCard: HTMLElement
): Array<AnimationSequence.Custom> {
  return [
    {
      target: headCard.querySelector(".title-text")!,
      animation: ({ target }) => {
        target.style.opacity = "1";
      },
      duration: 0.6,
      bezier: [0.25, 0, 0.2, 1],
    },
    {
      target: headCard.querySelector(".sub-title-text")!,
      animation: ({ target }) => {
        target.style.opacity = "1";
      },
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
      animation: ({ target }) => {
        setShadow(target, 3);
      },
      duration: 0.3,
      delay: 0.2,
      bezier: [0.4, 0, 0.2, 1],
    },
    [
      {
        target: headCard,
        animation: ({ target }) => {
          target.style.top = `calc(50% - 135px - ${hoverMargin}px)`;
        },
        duration: 0.35,
        delay: 0.2,
        bezier: [0.4, 0, 0.2, 1],
      },
      {
        target: nameCard,
        animation: ({ target }) => {
          setShadow(target, 2);
        },
        duration: 0.3,
        delay: 0.3,
        bezier: [0.4, 0, 0.2, 1],
      },
    ],
    {
      target: tagCard,
      animation: ({ target }) => {
        setShadow(target, 1);
        target.style.top = `calc(50% + 135px + ${hoverMargin}px)`;
      },
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
        animation: ({ target }) => {
          setShadow(target, 1);
        },
        duration: 0.3,
        delay: 0.1,
        bezier: [0.4, 0, 0.2, 1],
      },
      {
        target: nameCard,
        animation: ({ target }) => {
          setShadow(target, 1);
        },
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
  const animation = new SequenceAnimator(
    [
      // ...getHeadCardInitShadowAnimation(headCard),
      ...getHeadCardTextFadeInAnimation(headCard),
      ...getHoverSplitAnimation(headCard, nameCard, tagCard),
      ...getHoverDownAnimation(headCard, nameCard),
    ],
    () => {
      whenEnd();
      switchToFlexStyles(cardContainer, headCard, nameCard, tagCard);
    }
  );

  animation.start();
}
