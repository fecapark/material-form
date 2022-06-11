declare module "Router-Type" {
  export namespace Routes {
    interface RouteInfo {
      name: string;
      view: () => void;
    }

    interface SplitedProxyPath {
      proxy: string;
      path: string;
    }
  }
}
