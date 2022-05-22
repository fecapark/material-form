import "./InitialLogo.scss";
import Component from "../../core/Component/Component";
import { executeAnimation } from "./InitialLogo.ani";
export default class InitialLogo extends Component {
  constructor() {
    super({ id: "initial-logo-container" });
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div id="logo-text-container">
        <span id="sub-logo-text" class="dummy">material</span>
        <span id="logo-text">Todo List</span>
        <span class="dummy"></span>
      </div>
        
      <div class="mask top"></div>
      <div class="mask right"></div>
      <div class="mask bottom"></div>
      <div class="mask left"></div>
    `;

    executeAnimation(this.container);
  }
}
