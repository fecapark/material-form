import Component from "../../../core/Component/Component";
import { Range } from "../../../lib/Range/Range";
import "./TextInput.scss";

interface TextInputOptions {
  onFocus?: () => void;
  onFocusout?: () => void;
}

export default class TextInput extends Component {
  private readonly inputElementClassName: string = "text-input";
  private readonly placeholderElementClassName: string =
    "text-input-placeholder";

  private readonly onFocus: () => void;
  private readonly onFocusout: () => void;

  constructor(
    public placeholder: string = "",
    { onFocus = () => {}, onFocusout = () => {} }: TextInputOptions = {}
  ) {
    super({ classNames: ["text-input-container"] });

    this.onFocus = onFocus;
    this.onFocusout = onFocusout;

    this.render();
  }

  private get inputElement(): HTMLInputElement {
    return this.qs(`.${this.inputElementClassName}`)! as HTMLInputElement;
  }

  private get placeholderElement(): HTMLSpanElement {
    return this.qs(`.${this.placeholderElementClassName}`)! as HTMLSpanElement;
  }

  private get value(): string {
    return this.inputElement.value;
  }

  private isValidTextLength(text: string): boolean {
    return new Range(text.length).moreThan(0).equalAndLessThan(20).isIn();
  }

  private addInputElementEvents() {
    this.inputElement.addEventListener("focus", () => {
      this.inputElement.classList.add("focused");
      this.placeholderElement.classList.add("focused");
      this.onFocus();
    });
    this.inputElement.addEventListener("focusout", () => {
      if (this.value.length > 0) return;

      this.inputElement.classList.remove("focused");
      this.placeholderElement.classList.remove("focused");
      this.onFocusout();
    });
    this.inputElement.addEventListener("input", () => {
      const text: string = this.value.trim();
      const warn: HTMLDivElement = this.qs(
        ".warn-container"
      )! as HTMLDivElement;

      if (this.isValidTextLength(text)) {
        warn.classList.add("hidden");
      } else if (text.length === 0) {
        warn.classList.add("hidden");
      } else {
        warn.classList.remove("hidden");
      }
    });
  }

  private addPlaceholderElementEvents() {
    this.placeholderElement.addEventListener("click", (e: Event) => {
      e.stopPropagation();
      this.inputElement.focus();
    });
  }

  render() {
    this.container.innerHTML = `
    <div class="input-content-container">
      <input class="${this.inputElementClassName}" spellcheck=false />
      <span class="${this.placeholderElementClassName}">${this.placeholder}</span>
    </div>
    <div class="warn-container hidden">
      <i class='fa-solid fa-circle-exclamation'></i>
      <span class='warn-text'>이름이 너무 긴 것 같아요.</span>
    </div>
    `;

    this.addInputElementEvents();
    this.addPlaceholderElementEvents();
  }
}
