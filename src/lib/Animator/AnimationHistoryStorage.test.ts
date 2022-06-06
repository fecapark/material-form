import { AnimationData } from "Animator-Type";
import AnimationHistoryStorage from "./AnimationHistoryStorage";

const div1 = document.createElement("div");
const animationFixtures: Array<AnimationData.Custom> = [
  {
    target: div1,
    styles: [
      {
        prop: "transform",
        fvalue: "translate3d(%xpx, 0, 0)",
        from: () => [100],
        to: () => [200],
      },
    ],
    duration: 0,
  },
  {
    target: div1,
    styles: [
      {
        prop: "transform",
        fvalue: "translate3d(%xpx, 0, 0)",
        from: () => [200],
        to: () => [300],
      },
    ],
    duration: 0,
  },
  {
    target: div1,
    styles: [
      {
        prop: "opacity",
        fvalue: "%x",
        from: () => [0.3],
        to: () => [1],
      },
    ],
    duration: 1,
  },
];

describe("Test Animation History Stroage.", () => {
  let storage: AnimationHistoryStorage;
  beforeEach(() => {
    storage = new AnimationHistoryStorage();
  });

  it("Test push data.", () => {
    storage.push(animationFixtures[0]);
    storage.push(animationFixtures[1]);

    expect(storage.length).toBe(1);
  });

  it("Test pop data - 'Can find it?'", () => {
    storage.push(animationFixtures[0]);
    storage.push(animationFixtures[2]);

    const { prop, fvalue }: { prop: string; fvalue: string } =
      animationFixtures[2].styles[0];

    expect(storage.find(div1, prop, fvalue) !== undefined).toBe(true);
  });

  it("Test pop data - 'Can get latest from/to values?'", () => {
    storage.push(animationFixtures[0]);
    storage.push(animationFixtures[1]);

    const { prop, fvalue, from, to }: AnimationData.StyleData =
      animationFixtures[1].styles[0];
    const finded = storage.find(div1, prop, fvalue)!;

    expect(finded.from).toEqual(from);
    expect(finded.to).toEqual(to);
  });

  it("Test static data record.", () => {
    const { prop, fvalue }: { prop: string; fvalue: string } =
      animationFixtures[0].styles[0];
    const otherStorage: AnimationHistoryStorage = new AnimationHistoryStorage();

    storage.push(animationFixtures[0]);

    expect(otherStorage.find(div1, prop, fvalue) !== undefined).toBe(true);
  });
});
