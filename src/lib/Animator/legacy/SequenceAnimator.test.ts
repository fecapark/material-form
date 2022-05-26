// /**
//  * @jest-environment jsdom
//  */

// import { UserAnimationData } from "Animator-Type";
// import Animator from "./Animator";
// import SequenceAnimator from "./SequenceAnimator";

// const dataFixtures: Array<UserAnimationData> = [
//   {
//     target: document.createElement("div"),
//     animation: () => {},
//     duration: 0.1,
//     delay: 0.1,
//     bezier: [0, 0, 1, 1],
//     callWhenEnd: () => {},
//   },
//   {
//     target: document.createElement("div"),
//     animation: () => {},
//     duration: 0.1,
//   },
// ];

// describe("Test SequenceAnimator,", () => {
//   let sa: SequenceAnimator;
//   beforeEach(() => {
//     sa = new SequenceAnimator(dataFixtures);
//   });

//   it("Check amount of animators.", () => {
//     expect(sa.animationLines.length).toBe(dataFixtures.length);
//   });

//   it("Check member 'animators' elements are Animator instance.", () => {
//     sa.animationLines.forEach((aAnimatorLine) => {
//       aAnimatorLine.forEach((aAnimator) => {
//         expect(aAnimator instanceof Animator).toBe(true);
//       });
//     });
//   });
// });
export {};
