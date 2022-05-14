interface RouteInfo {
  name: string;
  view: () => void;
}

const defaultView = (): void => {
  throw Error("Please set view action to routes.");
};

class ROUTES {
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

  static setViewTo(path: string, newView: () => void): void {
    ROUTES.INFO[path].view = newView;
  }
}

export { ROUTES };
