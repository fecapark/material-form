import "./InfoCard.scss";
import Component from "../../../core/Component/Component";
import { Nullable } from "Animator-Type";

export default class InfoCard extends Component {
  constructor(public cardContent: Component | Nullable) {
    super({ classNames: ["info-card"] });
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="card-title-container">
        <span class="title">이름은 무엇인가요?</span>
        <span class="sub-title">20자 이내로 알려주세요!</span>
      </div>
    `;

    if (this.cardContent) {
      this.container.appendChild(this.cardContent.container);
    }
  }
}
