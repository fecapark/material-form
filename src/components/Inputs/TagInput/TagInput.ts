import Component from "../../../core/Component/Component";
import { Range } from "../../../lib/Range/Range";
import TagBlock from "../../Tag/TagBlock/TagBlock";
import "./TagInput.scss";

interface TagInputOptions {
  onFocus?: () => void;
  onFocusout?: () => void;
}

export default class TagInput extends Component {
  private readonly onFocus: () => void;
  private readonly onFocusout: () => void;
  private readonly MAX_TEXT_LENGTH: number = 10;
  private readonly MAX_TAG_AMOUNT: number = 5;

  private inputElement: HTMLInputElement | null = null;
  private isPressingBackspace: boolean = false;
  private removeFromMaxAmount: boolean = false;

  constructor({
    onFocus = () => {},
    onFocusout = () => {},
  }: TagInputOptions = {}) {
    super({ classNames: ["tag-input-container"] });

    this.onFocus = onFocus;
    this.onFocusout = onFocusout;

    this.store.setDefaultState("tags", []);
    this.store.setAction("addTag", ({ state, payload }) => {
      const { newTag } = payload;
      return { tags: [...state.tags, newTag] };
    });
    this.store.setAction("removeTag", ({ state, payload }) => {
      const { removeId } = payload;
      return {
        tags: state.tags.filter((aTagBlock: TagBlock) => {
          return aTagBlock.id !== removeId;
        }),
      };
    });

    this.render();
  }

  private isValidTextLength(text: string): boolean {
    return new Range(text.trim().length)
      .moreThan(0)
      .equalAndLessThan(this.MAX_TEXT_LENGTH)
      .isIn();
  }

  private submitTag(e: Event) {
    e.preventDefault();
    const tags: Array<TagBlock> = this.store.getState("tags");

    if (!this.inputElement) return;
    if (this.inputElement.value === "") return;
    if (!this.isValidTextLength(this.inputElement.value)) return;
    if (tags.length >= this.MAX_TAG_AMOUNT) {
      const warn = this.qs(".warn-container")!;
      warn.classList.remove("hidden");
      return;
    }

    this.store.dispatch("addTag", {
      newTag: new TagBlock(this.inputElement.value),
    });

    this.inputElement.value = "";
    this.inputElement.focus();
  }

  private renderInputElement(): HTMLInputElement {
    this.inputElement = document.createElement("input");
    this.inputElement.classList.add("tag-input");
    this.inputElement.placeholder = "태그 추가...";
    this.inputElement.spellcheck = false;
    this.inputElement.maxLength = this.MAX_TEXT_LENGTH;

    this.inputElement.addEventListener("focus", () => {
      this.onFocus();
    });
    this.inputElement.addEventListener("focusout", () => {
      if (this.store.getState("tags").length > 0) return;

      this.onFocusout();
    });

    return this.inputElement;
  }

  private renderTagInputWrapper(): HTMLElement {
    const tagInputWrapper: HTMLFormElement = document.createElement("form");
    tagInputWrapper.classList.add("tag-input-wrapper");
    tagInputWrapper.addEventListener("submit", this.submitTag.bind(this));
    tagInputWrapper.appendChild(this.renderInputElement());

    return tagInputWrapper;
  }

  private handleRemovingTagByClick(e: Event) {
    e.stopPropagation();

    const clickElement = e.target as HTMLElement;
    const tagElement: HTMLElement = clickElement.parentElement!;

    if (clickElement.tagName !== "I") return;

    this.store.dispatch("removeTag", {
      removeId: tagElement.id,
    });

    tagElement.remove();
    this.inputElement!.focus();
  }

  private handleRemoveingTagByKey(e: KeyboardEvent) {
    const isRemoveFromMaxAmount = (): boolean => {
      const warn: HTMLElement = this.qs(".warn-container")!;
      return (
        tags.length >= this.MAX_TAG_AMOUNT && !warn.classList.contains("hidden")
      );
    };

    e.stopPropagation();
    const tags: Array<TagBlock> = this.store.getState("tags");
    const latestTag: TagBlock = tags[tags.length - 1];

    if (e.key !== "Backspace") return;
    if (tags.length === 0) return;
    if (this.isPressingBackspace) return;
    if (this.inputElement!.value !== "") return;

    this.removeFromMaxAmount = isRemoveFromMaxAmount();
    this.store.dispatch("removeTag", {
      removeId: latestTag.id,
    });

    latestTag.container.remove();
    this.inputElement!.focus();
    this.isPressingBackspace = true;
  }

  private handleInitializeKeyboardState(e: KeyboardEvent) {
    e.stopPropagation();
    if (e.key !== "Backspace") return;

    this.isPressingBackspace = false;
  }

  private applyEventsForRemoveTag() {
    const tagInlineContainer: HTMLDivElement = this.qs(
      ".tag-inline-container"
    )! as HTMLDivElement;

    tagInlineContainer.addEventListener(
      "click",
      this.handleRemovingTagByClick.bind(this)
    );
    tagInlineContainer.addEventListener(
      "keydown",
      this.handleRemoveingTagByKey.bind(this)
    );
    tagInlineContainer.addEventListener(
      "keyup",
      this.handleInitializeKeyboardState.bind(this)
    );
  }

  render() {
    this.container.innerHTML = `
      <div class="tag-inline-container"></div>
      <div class="warn-container ${this.removeFromMaxAmount ? "" : "hidden"}">
        <i class='fa-solid fa-circle-exclamation'></i>
        <span class='warn-text'>우선 5개까지만 기억해볼게요.</span>
      </div>
    `;

    if (this.removeFromMaxAmount) {
      requestAnimationFrame(() => {
        this.qs(".warn-container")!.classList.add("hidden");
        this.removeFromMaxAmount = false;
      });
    }

    const tags: Array<TagBlock> = this.store.getState("tags");
    this.appendElementsTo(
      ".tag-inline-container",
      ...tags.map((aTagBlock) => {
        return aTagBlock.container;
      }),
      this.renderTagInputWrapper()
    );

    this.applyEventsForRemoveTag();
  }
}
