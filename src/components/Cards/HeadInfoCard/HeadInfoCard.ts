import "./HeadInfoCard.scss";
import Component from "../../../core/Component/Component";
import TagBlock from "../../Tag/TagBlock/TagBlock";
import CircleButton from "../../Buttons/CircleButton/CircleButton";
import { executeAnimation as resultProfileAnimation } from "./ResultProfileTrigger.ani";
import { executeAnimation as backMaskAnimation } from "./BackMask.ani";
import { executeAnimation as resultSubmitAnimation } from "./ResultSubmit.ani";
import LocalStorageManager from "../../../core/LocalStorage/localStorageManager";
import { ROUTES } from "../../../core/Router/routes";

interface ResultProfileData {
  name: string;
  tags: Array<TagBlock>;
}

interface HandleOptions {
  reRenderCardContainer: () => void;
}

export default class HeadInfoCard extends Component {
  private readonly reRenderCardContainer: () => void;
  private isBackButtonTriggered: boolean = false;
  private isSubmitButtonTriggered: boolean = false;
  private isResultProfileAnimationEnd: boolean = false;
  private resultProfileData: ResultProfileData = { name: "", tags: [] };
  private submitButton: CircleButton | null = null;

  constructor({ reRenderCardContainer }: HandleOptions) {
    super({ classNames: ["info-card", "head"] });

    this.reRenderCardContainer = reRenderCardContainer;

    this.store.setDefaultState("resultProfileTriggered", false);
    this.store.setAction("triggerResultProfile", ({ payload }) => {
      this.resultProfileData = { name: payload.name, tags: payload.tags };
      return { resultProfileTriggered: true };
    });

    this.render();
  }

  public get isResultProfileTriggered(): boolean {
    return this.store.getState("resultProfileTriggered");
  }

  public triggerResultProfile({ name, tags }: ResultProfileData) {
    this.store.dispatch("triggerResultProfile", { name, tags });
  }

  private submit() {
    LocalStorageManager.set("logined", true);

    this.isSubmitButtonTriggered = true;
    this.submitButton!.toggleDisable(true);

    requestAnimationFrame(() => {
      resultSubmitAnimation(
        this.container,
        this.qs(".result-profile-container")!,
        () => {
          ROUTES.viewWithRedirect("#main");
        }
      );
    });
  }

  private handleBackButton(e: PointerEvent) {
    e.stopPropagation();

    if (!this.isResultProfileAnimationEnd) return;
    if (this.isBackButtonTriggered) return;
    if (this.isSubmitButtonTriggered) return;

    this.isBackButtonTriggered = true;

    requestAnimationFrame(() => {
      backMaskAnimation(
        this.container,
        this.qs(".i-mask")!,
        this.reRenderCardContainer
      );
    });
  }

  render() {
    this.submitButton = new CircleButton(this.submit.bind(this), {
      content: '<i class="fa-solid fa-check"></i>',
      shadowLevel: 2,
      hiddenAtStart: true,
    });

    if (!this.isResultProfileTriggered) {
      this.container.innerHTML = `
      <span class="title-text">반가워요.</span>
      <span class="sub-title-text">우선, 사용자님에 대해 알려주세요.</span>
      `;
    } else {
      this.container.innerHTML = `
        <div class="dark-mask"></div>
        <div class="sub-mask">
          <div class="result-profile-container">
            <div class="i-mask"></div>
            <div class="top-button-container">
              <div class="back-button-wrapper">
                <i class="fa-solid fa-chevron-left"></i>
              </div>
              <div class="submit-button-wrapper">
              </div>
            </div>
            <div class="info-name-container">
              <span class="info-name">환영합니다!</span>
              <span class="info-remember">이제부터 ${
                this.resultProfileData.name
              }님을 기억할게요.</span>
            </div>
            <div class="info-tag-container">
              <div class="tag-block-container"></div>
              <span class="info-tag-text">총 ${
                this.resultProfileData.tags.length
              }개의 태그${
        this.resultProfileData.tags.length > 1 ? "들" : ""
      }도 설정했어요.</span>
            </div>
          </div>
        </div>
      `;

      this.prependElementsTo(
        ".info-tag-container > .tag-block-container",
        ...this.resultProfileData.tags
          .reverse()
          .map((aTagBlock) => aTagBlock.container)
      );

      this.appendElementsTo(
        ".submit-button-wrapper",
        this.submitButton!.container
      );

      this.qs(".back-button-wrapper")!.addEventListener(
        "pointerup",
        this.handleBackButton.bind(this) as EventListener
      );

      requestAnimationFrame(() => {
        resultProfileAnimation(
          this.container,
          this.qs(".dark-mask")!,
          this.qs(".sub-mask")!,
          () => {
            this.isResultProfileAnimationEnd = true;
          }
        );
      });
    }
  }
}
