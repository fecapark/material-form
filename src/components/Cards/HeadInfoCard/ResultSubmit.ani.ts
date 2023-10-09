import { AnimationSequence } from "Animator-Type";
import { getDummyAnimationData } from "../../../lib/Animator/Animator";
import SequenceAnimator from "../../../lib/Animator/SequenceAnimator";
import {
  getShadowFormatValue,
  getShadowValue,
} from "../../../lib/shadow/shadow";
import { Vector2 } from "../../../lib/Vector/Vector";
import { ROUTES } from "../../../core/Router/routes";

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
      onEnd: ({ target }) => {
        target.style.cursor = "default";
      },
    },
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

function scalingButtonAnimation(
  resultProfileContainer: HTMLElement
): Array<AnimationSequence.Custom> {
  const submitButton: HTMLElement =
    resultProfileContainer.querySelector(".circle-button")!;

  let stageWidth: number = -1;
  let stageHeight: number = -1;
  let btnPos = new Vector2(0, 0);

  const setStageSize = () => {
    stageWidth = document.body.clientWidth;
    stageHeight = document.body.clientHeight;

    const { x, y } = submitButton.getBoundingClientRect();
    btnPos = new Vector2(x, y);
  };

  const calculateTargetScale = () => {
    if (stageWidth < 0 || stageHeight < 0) setStageSize();

    const ENSURE_SCALE_FACTOR = 1.0;

    const btnRadius = 60 / 2;
    const tl = btnPos.dist(new Vector2(0, 0)) / btnRadius;
    const tr = btnPos.dist(new Vector2(stageWidth, 0)) / btnRadius;
    const bl = btnPos.dist(new Vector2(0, stageHeight)) / btnRadius;
    const br = btnPos.dist(new Vector2(stageWidth, stageHeight)) / btnRadius;

    return Math.max(tl, tr, bl, br) * ENSURE_SCALE_FACTOR;
  };

  window.removeEventListener("resize", setStageSize);
  window.addEventListener("resize", setStageSize);

  return [
    [
      {
        target: submitButton,
        styles: [
          {
            prop: "transform",
            fvalue: "scale(%x)",
            from: () => [1],
            to: () => [calculateTargetScale()],
          },
        ],
        bezier: "new-super-accel",
        duration: 1,
        onStart: () => {
          document.getElementById("app")!.style.overflow = "hidden";
        },
        onEnd: () => {
          window.removeEventListener("resize", setStageSize);
        },
      },
      {
        target: submitButton,
        styles: [
          {
            prop: "box-shadow",
            fvalue: getShadowFormatValue(),
            from: () => [],
            to: () => getShadowValue(0),
          },
        ],
        bezier: [0.2, 0, 0, 1],
        duration: 0.3,
      },
    ],
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
      ...scalingButtonAnimation(resultProfileContainer),
    ],
    () => {
      onEnd();
      ROUTES.viewWithRedirect("#logo");
      document.getElementById("app")!.style.overflow = "";
    }
  ).play();
}
