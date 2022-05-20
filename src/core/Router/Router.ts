import { ROUTES } from "./routes";

export default class Router {
  private static globalEventSetted: boolean = false;
  private targetRoute: string;

  constructor(
    private readonly target: HTMLAnchorElement,
    eventType: string = "click"
  ) {
    this.targetRoute = this.getRouterDataFromElement(this.target);
    this.target.addEventListener(eventType, this.execute.bind(this));

    this.addGlobalRouterEvents();
  }

  addGlobalRouterEvents() {
    if (Router.globalEventSetted) return;
    Router.globalEventSetted = true;

    window.addEventListener("popstate", this.renderViewWhenPopState.bind(this));
    window.addEventListener(
      "routetrigger",
      this.renderViewWhenRouteTriggered.bind(this) as EventListener
    );
  }

  getRouterDataFromElement(target: HTMLAnchorElement): string {
    const route: string = target.getAttribute("href")!;

    if (route === "")
      throw Error("Router must be setted html attribute 'href'.");

    return route;
  }

  execute(e: Event) {
    e.preventDefault(); // Prevent anchor redirect event

    const routeTriggerEvent = new CustomEvent("routetrigger", {
      composed: true,
      detail: { href: this.targetRoute },
    });

    window.dispatchEvent(routeTriggerEvent);
  }

  renderViewWhenPopState() {
    ROUTES.view(window.location.hash);
  }

  renderViewWhenRouteTriggered(e: CustomEvent) {
    const { href }: { href: string } = e.detail;
    ROUTES.viewWithRedirect(href);
  }
}
