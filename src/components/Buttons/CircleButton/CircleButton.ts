import "./CircleButton.scss";
import Component from "../../../core/Component/Component";
import { setShadow } from "../../../lib/shadow/shadow";

interface ButtonOptions {
  content?: string;
  shadowLevel?: number;
  hiddenAtStart?: boolean;
  style?: {
    width?: string;
    height?: string;
    fontSize?: string;
  };
}

export default class CircleButton extends Component {
  private readonly content: string;
  private readonly hiddenAtStart: boolean;
  private readonly customStyle: Record<string, string>;
  private ripple?: HTMLElement;

  constructor(
    private readonly onTouch: () => void,
    {
      content = "",
      shadowLevel = 0,
      hiddenAtStart = false,
      style = { width: "", height: "", fontSize: "" },
    }: ButtonOptions = {}
  ) {
    super({
      tagName: "button",
      classNames: ["circle-button", hiddenAtStart ? "hidden" : ""],
    });

    this.content = content;
    this.hiddenAtStart = hiddenAtStart;
    this.customStyle = style;

    setShadow(this.container, shadowLevel);
    this.setSize(style);

    this.render();
  }

  setSize({ width, height, fontSize }: Record<string, string>) {
    if (this.hiddenAtStart) {
      this.container.style.width = "0";
      this.container.style.height = "0";
      this.container.style.fontSize = "0";
      return;
    }

    this.container.style.width = width;
    this.container.style.height = height;
    this.container.style.fontSize = fontSize;
  }

  toggleHidden() {
    const { width, height, fontSize }: Record<string, string> =
      this.customStyle;

    if (this.container.classList.contains("hidden")) {
      this.container.style.width = width;
      this.container.style.height = height;
      this.container.style.fontSize = fontSize;
    } else {
      this.container.style.width = "0";
      this.container.style.height = "0";
      this.container.style.fontSize = "0";
    }

    this.container.classList.toggle("hidden");
  }

  handleButtonEvent(e: PointerEvent) {
    e.stopPropagation();
    this.onTouch();
  }

  renderRipple(e: PointerEvent) {
    e.stopPropagation();

    this.removeRipple();

    this.ripple = document.createElement("div");
    this.ripple.classList.add("ripple");

    const bRect: DOMRect = this.container.getBoundingClientRect();
    this.ripple.style.top = `${e.clientY - bRect.y}px`;
    this.ripple.style.left = `${e.clientX - bRect.x}px`;

    this.appendElementsTo("", this.ripple);
  }

  removeRipple() {
    if (!this.ripple) return;

    this.ripple.remove();
    this.ripple = undefined;
  }

  render() {
    this.container.removeEventListener(
      "pointerup",
      this.handleButtonEvent.bind(this)
    );
    this.container.removeEventListener(
      "pointerdown",
      this.renderRipple.bind(this)
    );

    this.container.innerHTML = this.content;

    this.container.addEventListener(
      "pointerup",
      this.handleButtonEvent.bind(this)
    );
    this.container.addEventListener(
      "pointerdown",
      this.renderRipple.bind(this)
    );
  }
}
