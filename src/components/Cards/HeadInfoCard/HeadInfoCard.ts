import "./HeadInfoCard.scss";
import Component from "../../../core/Component/Component";
import { executeAnimation as resultProfileAnimation } from "./ResultProfileTrigger.ani";
import { executeAnimation as backMaskAnimation } from "./BackMask.ani";
import TagBlock from "../../Tag/TagBlock/TagBlock";

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
  private isResultProfileAnimationEnd: boolean = false;
  private resultProfileData: ResultProfileData = { name: "", tags: [] };

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

  render() {
    if (!this.isResultProfileTriggered) {
      this.container.innerHTML = `
        <span class="title-text">반가워요!</span>
        <span class="sub-title-text">사용자님이 누군지 알려주세요.</span>
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
                <button>
                  <i class="fa-solid fa-check"></i>
                </button>
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

      const backButton = this.qs(".back-button-wrapper")! as HTMLElement;
      backButton.addEventListener("pointerup", (e: PointerEvent) => {
        e.stopPropagation();

        if (!this.isResultProfileAnimationEnd) return;
        if (this.isBackButtonTriggered) return;

        this.isBackButtonTriggered = true;

        requestAnimationFrame(() => {
          backMaskAnimation(
            this.container,
            this.qs(".i-mask")!,
            this.reRenderCardContainer
          );
        });
      });

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
