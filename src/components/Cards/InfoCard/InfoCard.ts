import "./InfoCard.scss";
import Component from "../../../core/Component/Component";
import { Nullable } from "Animator-Type";

interface CardTitleOptions {
  title?: string;
  subTitle?: string;
}

export default class InfoCard extends Component {
  private readonly title: string;
  private readonly subTitle: string;

  constructor(
    public cardContent: Component | Nullable,
    { title = "", subTitle = "" }: CardTitleOptions = {}
  ) {
    super({ classNames: ["info-card"] });

    this.title = title;
    this.subTitle = subTitle;

    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="card-title-container">
        <span class="title">${this.title}</span>
        <span class="sub-title">${this.subTitle}</span>
      </div>
    `;

    if (this.cardContent) {
      this.container.appendChild(this.cardContent.container);
    }
  }
}
