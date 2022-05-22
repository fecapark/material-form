/**
 * @jest-environment jsdom
 */

import { UserAnimationData } from "Animator-Type";
import { Animator } from "SequenceAnimator-Type";
import SequenceAnimator from "./SequenceAnimator";

const dataFixtures: Array<UserAnimationData> = [
  {
    target: document.createElement("div"),
    animation: () => {},
    duration: 0.1,
    delay: 0.1,
    bezier: [0, 0, 1, 1],
    callWhenEnd: () => {},
  },
  {
    target: document.createElement("div"),
    animation: () => {},
    duration: 0.1,
  },
];

describe("Test Animator", () => {
  let sa: SequenceAnimator;
  beforeEach(() => {
    sa = new SequenceAnimator(dataFixtures);
  });

  it("Set empty value to default value.", () => {
    const ani: Animator = sa.animationLines[1][0];

    expect(ani.delay).toBe(0.01);
    expect(ani.bezier).toEqual([0, 0, 1, 1]);
    expect(typeof ani.callWhenEnd).toBe("function");
    expect(ani.pauseWhenEnd).toBe(false);
  });
});
