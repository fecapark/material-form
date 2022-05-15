/**
 * @jest-environment jsdom
 */

import { ROUTES } from "./routes";

describe("Test routes module.", () => {
  it("Set another view to route.", () => {
    const testPath: string = "/";

    ROUTES.setViewTo(testPath, () => {
      throw Error("test1");
    });

    expect(() => {
      ROUTES.INFO[testPath].view();
    }).toThrow("test1");
  });
});

describe("Test routes module: split proxy path", () => {
  it("Remove a proxy path.", () => {
    const { proxy, path }: { proxy: string; path: string } =
      ROUTES.splitProxyPath("/proxy/23/");

    expect(proxy).toBe("/proxy/23");
    expect(path).toBe("/");
  });

  it("Remove nested proxy paths.", () => {
    const { proxy, path }: { proxy: string; path: string } =
      ROUTES.splitProxyPath("/proxy/23/proxy/42/");

    expect(proxy).toBe("/proxy/23/proxy/42");
    expect(path).toBe("/");
  });

  it("Remain real routes.", () => {
    const { proxy, path }: { proxy: string; path: string } =
      ROUTES.splitProxyPath("/proxy/23/hello");

    expect(proxy).toBe("/proxy/23");
    expect(path).toBe("/hello");
  });

  it("Remain routes contain proxy path.", () => {
    const { proxy, path }: { proxy: string; path: string } =
      ROUTES.splitProxyPath("/proxy/23/hello/proxy/3000/");

    expect(proxy).toBe("/proxy/23");
    expect(path).toBe("/hello/proxy/3000/");
  });
});
