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
