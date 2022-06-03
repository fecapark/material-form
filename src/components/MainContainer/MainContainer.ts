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
    const titleContainerSelector: string = ".card-title-container";
    const titleSelector: string = `${titleContainerSelector} > .title`;
    const subTitleSelector: string = `${titleContainerSelector} > .sub-title`;

    const headCard = new HeadInfoCard();
    const nameCard = new InfoCard(
      new TextInput("제 이름은...", {
        onFocus: () => {
          nameCard.qs(titleContainerSelector)!.classList.add("hidden");
          nameCard.qs(titleSelector)!.classList.add("hidden");
          nameCard.qs(subTitleSelector)!.classList.add("hidden");
        },
        onFocusout: () => {
          nameCard.qs(titleContainerSelector)!.classList.remove("hidden");
          nameCard.qs(titleSelector)!.classList.remove("hidden");
          nameCard.qs(subTitleSelector)!.classList.remove("hidden");
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
