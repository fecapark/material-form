import "./App.scss";

export default class App {
  constructor(readonly target: HTMLDivElement) {
    this.renderApp();
  }

  renderApp(): void {
    this.target.innerHTML = `
      <h1>Router Test</h1>
      <button class="router" data-route="/">home</button>
      <button class="router data-route="/signin"">signin</button>
    `;
  }
}
