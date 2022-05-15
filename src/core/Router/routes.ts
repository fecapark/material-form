import { Nullable } from "global-types";

interface RouteInfo {
  name: string;
  view: () => void;
}

interface SplitedProxyPath {
  proxy: string;
  path: string;
}

const defaultView = (): void => {
  throw Error("Please set view action to routes.");
};

export class ROUTES {
  static PROXY_ROOT_PATH: string = "";
  static INFO: Record<string, RouteInfo> = {
    "/": {
      name: "home",
      view: defaultView,
    },
    "/signin": {
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
    const { path }: { path: string } = this.splitProxyPath(viewPath);
    this.INFO[path].view();
  }

  static splitProxyPath(path: string): SplitedProxyPath {
    let proxyPath: string = "";
    const startsWithProxyPath: RegExp = new RegExp("^\\/proxy\\/\\d+");

    while (path.match(startsWithProxyPath)) {
      proxyPath += path.match(startsWithProxyPath)![0];
      path = path.replace(startsWithProxyPath, "");
    }

    return { proxy: proxyPath, path };
  }
}
