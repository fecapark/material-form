import "./CircleButton.scss";
import Component from "../../../core/Component/Component";
import { setShadow } from "../../../lib/shadow/shadow";

interface ButtonOptions {
  shadowLevel?: number;
  hiddenAtStart?: boolean;
}

export default class CircleButton extends Component {
  private ripple: HTMLElement | null = null;

  constructor(
    private readonly onTouch: () => void,
    { shadowLevel = 0, hiddenAtStart = false }: ButtonOptions = {}
  ) {
    super({
      tagName: "button",
      classNames: ["circle-button", hiddenAtStart ? "hidden" : ""],
    });
    setShadow(this.container, shadowLevel);

    this.render();
  }

  handleButtonEvent(e: PointerEvent) {
    e.stopPropagation();
    this.onTouch();
  }

  renderRipple(e: PointerEvent) {
    this.removeRipple();

    this.ripple = document.createElement("div");
    this.ripple.classList.add("ripple");

    const bRect: DOMRect = this.container.getBoundingClientRect();
    this.ripple.style.top = `${e.clientY - bRect.top}px`;
    this.ripple.style.left = `${e.clientX - bRect.left}px`;

    this.appendElementsTo("", this.ripple);
  }

  removeRipple() {
    if (!this.ripple) return;

    this.ripple.remove();
    this.ripple = null;
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

    this.container.innerHTML = `
      <i class="fa-solid fa-arrow-right"></i>
    `;

    this.container.addEventListener(
      "pointerdown",
      this.renderRipple.bind(this)
    );
    this.container.addEventListener(
      "pointerup",
      this.handleButtonEvent.bind(this)
    );
  }
}
