import "./InitialLogo.scss";
import Component from "../../core/Component/Component";
import { executeAnimation } from "./InitialLogo.ani";

export default class InitialLogo extends Component {
  constructor(
    private isShowedOnce: boolean,
    private whenLogoAnimationEnd: () => void = () => {}
  ) {
    super({ id: "initial-logo-container" });
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div id="logo-text-container">
        <span id="logo-text">Material Form</span>
        <span id="sub-logo-text" class="dummy">by fecapark</span>
      </div>
        
      <div class="mask top"></div>
      <div class="mask right"></div>
      <div class="mask bottom"></div>
      <div class="mask left"></div>
    `;

    if (this.isShowedOnce) {
      this.qs("#logo-text-container")!.style.opacity = "0";
    }

    requestAnimationFrame(() => {
      executeAnimation(
        this.container,
        this.isShowedOnce,
        this.whenLogoAnimationEnd
      );
    });
  }
}
