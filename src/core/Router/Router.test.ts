/**
 * @jest-environment jsdom
 */

import Router from "./Router";

describe("Test replacing proxy path.", () => {
  let router: Router;
  beforeEach(() => {
    router = new Router();
  });

  it("Remove a proxy path.", () => {
    expect(router.replaceProxyPath("/proxy/23/")).toBe("/");
  });

  it("Remove nested proxy paths.", () => {
    expect(router.replaceProxyPath("/proxy/23/proxy/42/")).toBe("/");
  });

  it("Remain real routes.", () => {
    expect(router.replaceProxyPath("/proxy/23/hello")).toBe("/hello");
  });

  it("Remain routes contain proxy path.", () => {
    expect(router.replaceProxyPath("/proxy/23/hello/proxy/3000/")).toBe(
      "/hello/proxy/3000/"
    );
  });
});

export {};
