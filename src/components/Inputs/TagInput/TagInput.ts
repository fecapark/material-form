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

  private inputElement: HTMLInputElement | null = null;
  private isPressingBackspace: boolean = false;

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

    if (!this.inputElement) return;
    if (this.inputElement.value === "") return;
    if (!this.isValidTextLength(this.inputElement.value)) return;

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
    e.stopPropagation();
    if (e.key !== "Backspace") return;
    if (this.inputElement!.value !== "") return;
    if (this.isPressingBackspace) return;

    const tags: Array<TagBlock> = this.store.getState("tags");
    const latestTag: TagBlock = tags[tags.length - 1];

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
    `;

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
