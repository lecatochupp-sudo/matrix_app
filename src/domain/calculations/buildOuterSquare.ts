import { normalizeTo22 } from "./normalizeTo22\";

export function buildOuterSquare(matrixBase, formulas = { normalizeTo22 }) {
  const { left, top, right, bottom } = matrixBase.diagonal;

  return {
    betweenLeftTop: formulas.normalizeTo22(left + top),
    betweenTopRight: formulas.normalizeTo22(top + right),
    betweenRightBottom: formulas.normalizeTo22(right + bottom),
    betweenBottomLeft: formulas.normalizeTo22(bottom + left),
  };
}
