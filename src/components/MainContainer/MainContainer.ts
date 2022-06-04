import "./MainContainer.scss";
import Component from "../../core/Component/Component";
import HeadInfoCard from "../Cards/HeadInfoCard/HeadInfoCard";
import InfoCard from "../Cards/InfoCard/InfoCard";
import { executeAnimation } from "../Cards/InfoCard.ani";
import TextInput from "../Inputs/TextInput/TextInput";
import TagInput from "../Inputs/TagInput/TagInput";

export default class MainContainer extends Component {
  constructor() {
    super({ id: "main-container" });
    this.render();
  }

  private renderChilds(): Array<Component> {
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
      }),
      {
        title: "이름은 무엇인가요?",
        subTitle: "20자 이내에서 알려주세요!",
      }
    );
    const tagCard = new InfoCard(
      new TagInput({
        onFocus: () => {
          tagCard.qs(titleContainerSelector)!.classList.add("hidden");
          tagCard.qs(titleSelector)!.classList.add("hidden");
          tagCard.qs(subTitleSelector)!.classList.add("hidden");
        },
        onFocusout: () => {
          tagCard.qs(titleContainerSelector)!.classList.remove("hidden");
          tagCard.qs(titleSelector)!.classList.remove("hidden");
          tagCard.qs(subTitleSelector)!.classList.remove("hidden");
        },
      }),
      {
        title: "관심사도 자유롭게 알려주세요!",
        subTitle: "관심사들을 5개까지 태그로 만들어드릴게요.",
      }
    );

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
