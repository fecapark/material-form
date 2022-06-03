import "./MainContainer.scss";
import Component from "../../core/Component/Component";
import HeadInfoCard from "../Cards/HeadInfoCard/HeadInfoCard";
import InfoCard from "../Cards/InfoCard/InfoCard";
import { executeAnimation } from "../Cards/InfoCard.ani";
import TextInput from "../Inputs/TextInput/TextInput";

export default class MainContainer extends Component {
  constructor() {
    super({ id: "main-container" });
    this.render();
  }

  renderChilds(): Array<Component> {
    const headCard = new HeadInfoCard();
    const nameCard = new InfoCard(
      new TextInput("제 이름은...", {
        onFocus: () => {
          nameCard.qs(".card-title-container")!.classList.add("hidden");
        },
        onFocusout: () => {
          nameCard.qs(".card-title-container")!.classList.remove("hidden");
        },
      })
    );
    const tagCard = new InfoCard(null);

    return [headCard, nameCard, tagCard];
  }

  render() {
    this.container.innerHTML = `
      <div class="card-container"></div>
    `;

    const cardContainer: HTMLDivElement = this.qs(
      ".card-container"
    )! as HTMLDivElement;
    const [headCard, nameCard, tagCard] = this.renderChilds();

    this.appendElementsTo(
      ".card-container",
      tagCard.container,
      nameCard.container,
      headCard.container
    );

    requestAnimationFrame(() => {
      executeAnimation(
        cardContainer,
        headCard.container,
        nameCard.container,
        tagCard.container
      );
    });
  }
}
