import Component from "../../core/Component/Component";
import MainNavigator from "../Navigator/MainNavigator";
import "./MainContainer.scss";

export default class MainContainer extends Component {
  constructor() {
    super({ id: "main-container" });
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="cover-container">
        <div class="title-container">
          <span class="title-text">
            오늘 할일을<br/>
            기록하고 확인하세요
          </span>
          <span class="sub-title-text">
            자유롭게 메모해보세요.
          </span>
        </div>
      </div>

      <div class="main-card-container">
      </div>
    `;

    this.prependElementsTo("", new MainNavigator().container);

    // for (let i = 0; i < 20; i++) {
    //   const post = document.createElement("div");
    //   post.classList.add("post");
    //   post.style.height = `${Math.random() * 300 + 180}px`;

    //   this.appendElementsTo(".main-card-container", post);
    // }
  }
}
