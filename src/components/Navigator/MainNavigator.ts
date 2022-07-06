import Component from "../../core/Component/Component";
import "./MainNavigator.scss";

export default class MainNavigator extends Component {
  constructor() {
    super({ id: "main-navigator-container", tagName: "header" });
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="logo-wrapper">
        <span>T</span>
      </div>
      <div class="toggle-container">
        <div class="toggle-option-area">
          <div class="toggle-option todo selected">
            <span>할 것</span>
          </div>
        </div>
        <div class="toggle-option-area">
          <div class="toggle-option complete">
            <span>끝낸 것</span>
          </div>
        </div>
      </div>
      <div class="options-container">
        <div class="search-wrapper">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div class="menu-wrapper">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>
    `;
  }
}
