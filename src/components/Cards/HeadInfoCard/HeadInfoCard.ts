import "./HeadInfoCard.scss";
import Component from "../../../core/Component/Component";
import { executeAnimation } from "./HeadInfoCardMask.ani";

export default class HeadInfoCard extends Component {
  constructor() {
    super({ classNames: ["info-card", "head"] });

    this.store.setDefaultState("maskTriggered", false);
    this.store.setAction("triggerMask", () => {
      return { maskTriggered: true };
    });

    this.render();
  }

  public triggerMask() {
    this.store.dispatch("triggerMask", {});
  }

  render() {
    if (!this.store.getState("maskTriggered")) {
      this.container.innerHTML = `
        <span class="title-text">반가워요!</span>
        <span class="sub-title-text">사용자님이 누군지 알려주세요.</span>
      `;
    } else {
      this.container.innerHTML = `
        <div class="dark-mask"></div>
        <div class="sub-mask">
          <div class="result-profile-container">
            <i class="fa-solid fa-chevron-left"></i>
            <div class="info-name-container">
              <span class="info-name">환영합니다, 박상혁님.</span>
              <span class="info-remember">이제부터 박상혁님을 기억할게요.</span>
            </div>
            <div class="info-tag-container"></div>
          </div>
        </div>
      `;

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
