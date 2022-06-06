import "./HeadInfoCard.scss";
import Component from "../../../core/Component/Component";
import { executeAnimation } from "./HeadInfoCardMask.ani";
import TagBlock from "../../Tag/TagBlock/TagBlock";

interface ResultProfileData {
  name: string;
  tags: Array<TagBlock>;
}

export default class HeadInfoCard extends Component {
  private resultProfileData: ResultProfileData = { name: "", tags: [] };

  constructor() {
    super({ classNames: ["info-card", "head"] });

    this.store.setDefaultState("resultProfileTriggered", false);
    this.store.setAction("triggerResultProfile", ({ payload }) => {
      this.resultProfileData = { name: payload.name, tags: payload.tags };
      return { resultProfileTriggered: true };
    });

    this.render();
  }

  public triggerResultProfile({ name, tags }: ResultProfileData) {
    this.store.dispatch("triggerResultProfile", { name, tags });
  }

  render() {
    if (!this.store.getState("resultProfileTriggered")) {
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
            <i class="fa-solid fa-chevron-left"></i>
            <div class="info-name-container">
              <span class="info-name">환영합니다, ${
                this.resultProfileData.name
              }님.</span>
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

      requestAnimationFrame(() => {
        executeAnimation(
          this.container,
          this.qs(".dark-mask")!,
          this.qs(".sub-mask")!
        );
      });
    }
  }
}
