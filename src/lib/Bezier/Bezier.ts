import { Vector2 } from "../Vector/Vector";

type BezierValue = [number, number, number, number];
type BezierClosure = (t: number) => number;

function parseBezierValue(key: string): BezierValue {
  const BEZIER_TABLE: Record<string, BezierValue> = {
    linear: [0, 0, 1, 1],
    ease: [0.25, 1, 0.25, 1],
    "ease-in": [0.42, 0, 1, 1],
    "ease-out": [0, 0, 0.58, 1],
    "ease-in-out": [0.42, 0, 0.58, 1],
    "material-normal": [0.4, 0, 0.2, 1],
    "material-accel": [0, 0, 0.2, 1],
  };

  return BEZIER_TABLE[key];
}

export function Bezier(customValue: string | BezierValue): BezierClosure {
  const [x1, y1, x2, y2]: BezierValue =
    typeof customValue === "string"
      ? parseBezierValue(customValue)
      : customValue;

  const v1: Vector2 = new Vector2(0, 0);
  const v2: Vector2 = new Vector2(x1, y1);
  const v3: Vector2 = new Vector2(x2, y2);
  const v4: Vector2 = new Vector2(1, 1);

  const bezier: BezierClosure = (t) => {
    t = Math.min(1, Math.max(0, t));
    const s: number = 1 - t;

    const P = v1.mul(s).add(v2.mul(t));
    const Q = v2.mul(s).add(v3.mul(t));
    const R = v3.mul(s).add(v4.mul(t));

    const X = P.mul(s).add(Q.mul(t));
    const Y = Q.mul(s).add(R.mul(t));

    const RESULT = X.mul(s).add(Y.mul(t));

    // Returns bezier ratio as positive number (0 ~ 1)
    return RESULT.y;
  };

  return bezier;
}
