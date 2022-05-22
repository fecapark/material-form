import "./HeadInfoCard.scss";
import Component from "../../../core/Component/Component";

export default class HeadInfoCard extends Component {
  constructor() {
    super({ classNames: ["info-card", "head"] });
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <span class="title-text">반가워요.</span>
      <span class="sub-title-text">사용자님이 누군지 알려주세요!</span>
    `;
  }
}
