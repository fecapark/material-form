import "./InitialLogo.scss";
import Component from "../../core/Component/Component";

export default class InitialLogo extends Component {
  constructor() {
    super({ id: "initial-logo-container" });

    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div id="logo-text-wrapper">
        <span id="logo-text">Todo List</span>
      </div>
    `;
  }
}
