import Component from "../../../core/Component/Component";
import "./TagBlock.scss";

interface TagBlockOptions {
  hasCloseButton?: boolean;
}

export default class TagBlock extends Component {
  readonly text: string;
  private readonly hasCloseButton: boolean;

  constructor(text: string, { hasCloseButton = true }: TagBlockOptions = {}) {
    const { hash, salt }: { hash: string; salt: string } = text.getHash();
    super({ id: hash + salt, classNames: ["tag-block"] });

    this.hasCloseButton = hasCloseButton;
    this.text = this.parseHashText(text);

    this.render();
  }

  private parseHashText(text: string): string {
    text = text.trim();
    text = text.replaceAll(" ", "_");

    if (text.startsWith("#")) return text;
    return `#${text}`;
  }

  setRandomBackgroundColor() {
    this.container.style.backgroundColor = `hsl(${Math.floor(
      Math.random() * 360
    )}, 60%, 75%)`;
  }

  render() {
    this.container.innerHTML = `
      <span class="tag-text">${this.text}</span>
      ${this.hasCloseButton ? "<i class='fa-solid fa-xmark'></i>" : ""}
    `;

    this.setRandomBackgroundColor();
  }
}
