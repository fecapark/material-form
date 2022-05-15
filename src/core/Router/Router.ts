import { ROUTES } from "./routes";

/*
클릭(컴포넌트) -> customEvent 생성 -> window.dispatchEvent
-> 등록해두었던 eventListener 실행 -> window.history.pushState -> view 생성
*/

export default class Router {
  static globalEventSetted: boolean = false;
  targetRoute: string;

  constructor(readonly target: HTMLElement, eventType: string = "click") {
    this.targetRoute = this.getRouterDataFromElement(this.target);
    this.target.addEventListener(eventType, this.execute.bind(this));

    this.addGlobalRouterEvents();
  }

  addGlobalRouterEvents() {
    if (Router.globalEventSetted) return;
    Router.globalEventSetted = true;

    // 1. popstate event
    window.addEventListener("popstate", this.renderViewWhenPopState.bind(this));

    // 2. routetrigger custom event
    window.addEventListener(
      "routetrigger",
      this.renderViewWhenRouteTriggered.bind(this) as EventListener
    );
  }

  getRouterDataFromElement(target: HTMLElement): string {
    const { route } = target.dataset;

    if (!route)
      throw Error("Router must be setted html attribute 'data-route'.");

    return route;
  }

  execute() {
    console.log("router executed! : Router/execute()");

    const routeTriggerEvent = new CustomEvent("routetrigger", {
      composed: true,
      detail: { href: this.targetRoute },
    });

    window.dispatchEvent(routeTriggerEvent);
  }

  renderViewWhenPopState() {
    ROUTES.view(window.location.pathname);
  }

  renderViewWhenRouteTriggered(e: CustomEvent) {
    console.log("route event triggered! : Router/renderwhen....()");

    const { href }: { href: string } = e.detail;

    window.history.pushState(null, "", `${ROUTES.PROXY_ROOT_PATH}${href}`);
    ROUTES.view(href);
  }
}
