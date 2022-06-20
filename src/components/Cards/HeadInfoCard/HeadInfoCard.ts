import "./HeadInfoCard.scss";
import Component from "../../../core/Component/Component";
import TagBlock from "../../Tag/TagBlock/TagBlock";
import CircleButton from "../../Buttons/CircleButton/CircleButton";
import { executeAnimation as resultProfileAnimation } from "./ResultProfileTrigger.ani";
import { executeAnimation as backMaskAnimation } from "./BackMask.ani";
import { Store } from "Store-Type";
import LocalStorageManager from "../../../core/LocalStorage/localStorageManager";

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

  constructor(
    private readonly globalStore: Store.AbstractStore,
    { reRenderCardContainer }: HandleOptions
  ) {
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
    // console.log(this.globalStore.getState("logined"));
    LocalStorageManager.set("logined", true);
    // console.log(LocalStorageManager.get("logined"));
  }

  private handleBackButton(e: PointerEvent) {
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
        new CircleButton(this.submit.bind(this), {
          content: '<i class="fa-solid fa-check"></i>',
          shadowLevel: 2,
          hiddenAtStart: true,
        }).container
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
