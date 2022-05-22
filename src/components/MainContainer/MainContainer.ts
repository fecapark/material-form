import "./MainContainer.scss";
import Component from "../../core/Component/Component";
import HeadInfoCard from "../Cards/HeadInfoCard/HeadInfoCard";
import InfoCard from "../Cards/InfoCard/InfoCard";
import { executeAnimation } from "../Cards/InfoCard.ani";

export default class MainContainer extends Component {
  constructor() {
    super({ id: "main-container" });
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="card-container"></div>
    `;

    const cardContainer: HTMLDivElement =
      this.container.querySelector(".card-container")!;

    const headCard = new HeadInfoCard();
    const nameInfoCard = new InfoCard();
    const tagInfoCard = new InfoCard();

    cardContainer.appendChild(tagInfoCard.container);
    cardContainer.appendChild(nameInfoCard.container);
    cardContainer.appendChild(headCard.container);

    executeAnimation(
      cardContainer,
      headCard.container,
      nameInfoCard.container,
      tagInfoCard.container
    );
  }
}
