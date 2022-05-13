import "./App.scss";

export default class App {
  constructor(readonly target: HTMLDivElement) {
    this.renderApp();
  }

  renderApp(): void {
    this.target.innerHTML = `
      <h1>Hello Vite!</h1>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
    `;
  }
}
