import { ROUTES } from "./routes";

export default class Router {
  constructor() {
    window.addEventListener("popstate", this.renderViewWhenPopState.bind(this));
  }

  addRouteTriggerEvent() {
    window.addEventListener("routetrigger", () => {});
  }

  replaceProxyPath(path: string): string {
    const startsWithProxyPath: RegExp = new RegExp("^\\/proxy\\/\\d+");

    while (path.match(startsWithProxyPath)) {
      path = path.replace(startsWithProxyPath, "");
    }

    return path;
  }

  renderViewWhenPopState() {
    const toRenderPath: string = this.replaceProxyPath(
      window.location.pathname
    );
    ROUTES.INFO[toRenderPath].view();
  }
}
