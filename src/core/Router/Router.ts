import { ROUTES } from "./routes";

/*
클릭(컴포넌트) -> customEvent 생성 -> window.dispatchEvent
-> 등록해두었던 eventListener 실행 -> window.history.pushState -> view 생성
*/

export default class Router {
  static globalEventSetted: boolean = false;
  targetRoute: string;

  constructor(readonly target: HTMLAnchorElement, eventType: string = "click") {
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

  getRouterDataFromElement(target: HTMLAnchorElement): string {
    const route: string = target.getAttribute("href")!;
    console.log("href route: ", route, " from ", target);

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
    // Todo: 리팩토링하기. 어떤게 들어와도 #가 1개만 있어야 함.
    let hashPath: string;
    if (window.location.hash.startsWith("##")) {
      hashPath = window.location.hash.replace("#", "");
    } else {
      hashPath = window.location.hash;
    }

    console.log("hash path: ", hashPath, window.location.hash);
    ROUTES.view(hashPath !== "" ? hashPath : "#");
  }

  renderViewWhenRouteTriggered(e: CustomEvent) {
    const { href }: { href: string } = e.detail;

    console.log("to pushstate: ", `${ROUTES.ROOT_PATH}${href}`);

    window.history.pushState(null, "", `${ROUTES.ROOT_PATH}${href}`);
    ROUTES.view(href);
  }
}
