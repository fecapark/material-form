import Component from "../../../core/Component/Component";
import { Range } from "../../../lib/Range/Range";
import TagBlock from "../../Tag/TagBlock/TagBlock";
import "./TagInput.scss";

interface TagInputOptions {
  onFocus?: () => void;
  onFocusout?: () => void;
  onSubmit?: () => void;
  onRemoveTag?: () => void;
}

export default class TagInput extends Component {
  private readonly onFocus: () => void;
  private readonly onFocusout: () => void;
  private readonly onSubmit: () => void;
  private readonly onRemoveTag: () => void;
  private readonly MAX_TEXT_LENGTH: number = 10;
  private readonly MAX_TAG_AMOUNT: number = 5;

  private inputElement: HTMLInputElement | null = null;
  private isPressingBackspace: boolean = false;
  private removeFromMaxAmount: boolean = false;

  constructor({
    onFocus = () => {},
    onFocusout = () => {},
    onSubmit = () => {},
    onRemoveTag = () => {},
  }: TagInputOptions = {}) {
    super({ classNames: ["tag-input-container"] });

    this.onFocus = onFocus;
    this.onFocusout = onFocusout;
    this.onSubmit = onSubmit;
    this.onRemoveTag = onRemoveTag;

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

  public get isValid(): boolean {
    return this.tags.length > 0;
  }

  public get tags(): Array<TagBlock> {
    return this.store.getState("tags");
  }

  private isValidTextLength(text: string): boolean {
    return new Range(text.trim().length)
      .moreThan(0)
      .equalAndLessThan(this.MAX_TEXT_LENGTH)
      .isIn();
  }

  private isUniqueTag(tag: TagBlock): boolean {
    return (
      this.tags.filter((aTag) => {
        return aTag.text === tag.text;
      }).length === 0
    );
  }

  private submitTag(e: Event) {
    e.preventDefault();

    if (!this.inputElement) return;
    if (this.inputElement.value === "") return;
    if (!this.isValidTextLength(this.inputElement.value)) return;
    if (this.tags.length >= this.MAX_TAG_AMOUNT) {
      const warn = this.qs(".warn-container")!;
      warn.classList.remove("hidden");
      return;
    }
    const newTag = new TagBlock(this.inputElement.value);
    if (!this.isUniqueTag(newTag)) {
      this.inputElement.value = "";
      return;
    }

    this.store.dispatch("addTag", { newTag });
    this.inputElement.value = "";
    this.inputElement.focus();
    this.onSubmit();
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
      if (this.isValid) return;

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
    this.onRemoveTag();
  }

  private handleRemoveingTagByKey(e: KeyboardEvent) {
    const isRemoveFromMaxAmount = (): boolean => {
      const warn: HTMLElement = this.qs(".warn-container")!;
      return (
        this.tags.length >= this.MAX_TAG_AMOUNT &&
        !warn.classList.contains("hidden")
      );
    };

    e.stopPropagation();
    const latestTag: TagBlock = this.tags[this.tags.length - 1];

    if (e.key !== "Backspace") return;
    if (this.tags.length === 0) return;
    if (this.isPressingBackspace) return;
    if (this.inputElement!.value !== "") return;

    this.removeFromMaxAmount = isRemoveFromMaxAmount();
    this.store.dispatch("removeTag", {
      removeId: latestTag.id,
    });

    latestTag.container.remove();
    this.inputElement!.focus();
    this.isPressingBackspace = true;
    this.onRemoveTag();
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
        <div class="icon-container">
          <i class='fa-solid fa-circle-exclamation'></i>
        </div>
        <span class='warn-text'>우선 5개까지만 기억해볼게요.</span>
      </div>
    `;

    if (this.removeFromMaxAmount) {
      requestAnimationFrame(() => {
        this.qs(".warn-container")!.classList.add("hidden");
        this.removeFromMaxAmount = false;
      });
    }

    this.appendElementsTo(
      ".tag-inline-container",
      ...this.tags.map((aTagBlock) => {
        return aTagBlock.container;
      }),
      this.renderTagInputWrapper()
    );

    this.applyEventsForRemoveTag();
  }
}
