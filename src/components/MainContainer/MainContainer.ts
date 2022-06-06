import "./MainContainer.scss";
import Component from "../../core/Component/Component";
import HeadInfoCard from "../Cards/HeadInfoCard/HeadInfoCard";
import InfoCard from "../Cards/InfoCard/InfoCard";
import TextInput from "../Inputs/TextInput/TextInput";
import TagInput from "../Inputs/TagInput/TagInput";
import CircleButton from "../Buttons/CircleButton/CircleButton";
import { executeAnimation as splitAnimation } from "../Cards/InfoCardSplit.ani";
import { executeAnimation as mergeAnimation } from "../Cards/InfoCardMerge.ani";

export default class MainContainer extends Component {
  private readonly TITLE_CONTAINER_SELECTOR: string = ".card-title-container";
  private readonly TITLE_SELECTOR: string = `${this.TITLE_CONTAINER_SELECTOR} > .title`;
  private readonly SUB_TITLE_SELECTOR: string = `${this.TITLE_CONTAINER_SELECTOR} > .sub-title`;
  private readonly headCard: HeadInfoCard;
  private readonly nameCard: InfoCard;
  private readonly tagCard: InfoCard;
  private readonly button: CircleButton;

  private nameInfoValid: boolean = false;
  private tagInfoValid: boolean = false;

  constructor() {
    super({ id: "main-container" });

    this.headCard = this.renderHeadCard();
    this.nameCard = this.renderNameCard();
    this.tagCard = this.renderTagCard();
    this.button = this.renderButton();

    this.render();
  }

  private get cardContainer(): HTMLElement {
    return this.qs(".card-container")! as HTMLElement;
  }

  private checkAndToggleButton() {
    const button: HTMLButtonElement = this.qs(
      ".circle-button"
    )! as HTMLButtonElement;

    if (this.nameInfoValid && this.tagInfoValid) {
      button.classList.remove("hidden");
    } else {
      button.classList.add("hidden");
    }
  }

  private renderHeadCard(): HeadInfoCard {
    return new HeadInfoCard();
  }

  private renderNameCard(): InfoCard {
    const textInput = new TextInput("제 이름은...", {
      onFocus: () => {
        nameCard.qs(this.TITLE_CONTAINER_SELECTOR)!.classList.add("hidden");
        nameCard.qs(this.TITLE_SELECTOR)!.classList.add("hidden");
        nameCard.qs(this.SUB_TITLE_SELECTOR)!.classList.add("hidden");
      },
      onFocusout: () => {
        nameCard.qs(this.TITLE_CONTAINER_SELECTOR)!.classList.remove("hidden");
        nameCard.qs(this.TITLE_SELECTOR)!.classList.remove("hidden");
        nameCard.qs(this.SUB_TITLE_SELECTOR)!.classList.remove("hidden");
      },
      onInput: () => {
        this.nameInfoValid = textInput.isValid;
        this.checkAndToggleButton();
      },
    });
    const nameCard = new InfoCard(textInput, {
      title: "이름은 무엇인가요?",
      subTitle: "20자 이내에서 알려주세요!",
    });

    return nameCard;
  }

  private renderTagCard(): InfoCard {
    const tagInput = new TagInput({
      onFocus: () => {
        tagCard.qs(this.TITLE_CONTAINER_SELECTOR)!.classList.add("hidden");
        tagCard.qs(this.TITLE_SELECTOR)!.classList.add("hidden");
        tagCard.qs(this.SUB_TITLE_SELECTOR)!.classList.add("hidden");
      },
      onFocusout: () => {
        tagCard.qs(this.TITLE_CONTAINER_SELECTOR)!.classList.remove("hidden");
        tagCard.qs(this.TITLE_SELECTOR)!.classList.remove("hidden");
        tagCard.qs(this.SUB_TITLE_SELECTOR)!.classList.remove("hidden");
      },
      onSubmit: () => {
        this.tagInfoValid = tagInput.isValid;
        this.checkAndToggleButton();
      },
      onRemoveTag: () => {
        this.tagInfoValid = tagInput.isValid;
        this.checkAndToggleButton();
      },
    });
    const tagCard = new InfoCard(tagInput, {
      title: "관심사도 자유롭게 알려주세요!",
      subTitle: "관심사들을 5개까지 태그로 만들어드릴게요.",
    });

    return tagCard;
  }

  private renderButton(): CircleButton {
    const onButtonTrigger = () => {
      document.getElementById("app")!.scrollTo({ top: 0, behavior: "smooth" });
      button.container.classList.add("hidden");
    };

    const executeMergeAnimation = () => {
      requestAnimationFrame(() => {
        mergeAnimation(
          this.cardContainer,
          this.headCard.container,
          this.nameCard.container,
          this.tagCard.container,
          () => {
            this.headCard.triggerMask();
          }
        );
      });
    };

    const button = new CircleButton(
      () => {
        onButtonTrigger();
        executeMergeAnimation();
      },
      {
        shadowLevel: 3,
        hiddenAtStart: true,
      }
    );

    return button;
  }

  render() {
    this.container.innerHTML = `
      <div class="card-container"></div>
    `;

    this.prependElementsTo(
      ".card-container",
      this.headCard.container,
      this.nameCard.container,
      this.tagCard.container,
      this.button.container
    );

    requestAnimationFrame(() => {
      splitAnimation(
        this.cardContainer,
        this.headCard.container,
        this.nameCard.container,
        this.tagCard.container
      );
    });
  }
}
