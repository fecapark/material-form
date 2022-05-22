import { Nullable } from "global-types";
import { Routes } from "Router-Type";

const parseHashPath = (toParse: string): string => {
  return toParse.startsWith("#") ? toParse : `#${toParse}`;
};

const defaultView = (): void => {
  throw Error("Please set view action to routes.");
};

export class ROUTES {
  static ROOT_PATH: string = "";
  private static INFO: Record<string, Routes.RouteInfo> = {
    "#": {
      name: "home",
      view: defaultView,
    },
    "#logo": {
      name: "logo",
      view: defaultView,
    },
    "#signin": {
      name: "signin",
      view: defaultView,
    },
  };

  static setViewTo(
    path: string,
    newView: () => void,
    resetContent: HTMLElement | Nullable = document.getElementById("app")
  ) {
    const viewWrapper = (): void => {
      if (resetContent) resetContent.innerHTML = "";
      newView();
    };

    this.INFO[path].view = viewWrapper;
  }

  static view(viewPath: string) {
    const path = parseHashPath(viewPath);

    if (!this.INFO.hasOwnProperty(path)) {
      this.view404();
      return;
    }

    this.INFO[path].view();
  }

  static viewWithRedirect(viewPath: string) {
    const path = parseHashPath(viewPath);

    window.history.pushState(null, "", `${ROUTES.ROOT_PATH}${path}`);
    this.view(path);
  }

  static view404() {
    const app: HTMLElement = document.getElementById("app")!;
    app.innerHTML = "404 Page not found.";
  }

  static splitProxyPath(path: string): Routes.SplitedProxyPath {
    const proxyPathRegex: RegExp = new RegExp("(\\/proxy\\/\\d+)+");
    const proxyPath = path.match(proxyPathRegex);

    return {
      proxy: proxyPath ? proxyPath[0] : "",
      path: path.replace(proxyPathRegex, ""),
    };
  }

  static setInitialRootPath() {
    const { proxy }: { proxy: string } = this.splitProxyPath(
      window.location.pathname
    );

    // When server is running on proxy.
    if (proxy) {
      this.ROOT_PATH = `${proxy}/`;
    }
  }
}
