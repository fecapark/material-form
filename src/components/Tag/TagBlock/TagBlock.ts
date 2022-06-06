import Component from "../../../core/Component/Component";
import "./TagBlock.scss";

interface TagBlockOptions {
  hasCloseButton?: boolean;
}

export default class TagBlock extends Component {
  public readonly text: string;
  private readonly colorString: string;

  constructor(text: string, { hasCloseButton = true }: TagBlockOptions = {}) {
    const { hash, salt }: { hash: string; salt: string } = text.getHash();
    super({ id: hash + salt, classNames: ["tag-block"] });

    this.store.setDefaultState("hasCloseButton", hasCloseButton);
    this.store.setAction("toggleCloseButton", ({ state }) => {
      return { hasCloseButton: !state.hasCloseButton };
    });

    this.text = this.parseHashText(text);
    this.colorString = this.getRandomBackgroundColor();

    this.render();
  }

  public toggleCloseButton() {
    this.store.dispatch("toggleCloseButton", {});
  }

  private parseHashText(text: string): string {
    text = text.trim();
    text = text.replaceAll(" ", "_");

    if (text.startsWith("#")) return text;
    return `#${text}`;
  }

  private getRandomBackgroundColor() {
    const hue: number = Math.floor(Math.random() * 360);
    const saturation: number = Math.floor(Math.random() * 10) + 55;
    const lightness: number = Math.floor(Math.random() * 10) + 75;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  render() {
    const hasCloseButton: boolean = this.store.getState("hasCloseButton");

    this.container.innerHTML = `
      <span class="tag-text">${this.text}</span>
      ${hasCloseButton ? "<i class='fa-solid fa-xmark'></i>" : ""}
    `;

    this.container.style.backgroundColor = this.colorString;
  }
}
