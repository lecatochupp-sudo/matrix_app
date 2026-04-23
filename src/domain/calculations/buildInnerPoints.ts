import { normalizeTo22 } from "./normalizeTo22";

function buildLine(label, vertex, center, formulas) {
  const p1 = formulas.normalizeTo22(vertex + center);
  const p2 = formulas.normalizeTo22(vertex + p1);

  return {
    label,
    vertex,
    p1,
    p2,
  };
}

export function buildInnerPoints(matrixBase, outerSquare, formulas = { normalizeTo22 }) {
  const center = matrixBase.diagonal.center;

  const diagonalLines = {
    leftToCenter: buildLine("Левая линия", matrixBase.diagonal.left, center, formulas),
    topToCenter: buildLine("Верхняя линия", matrixBase.diagonal.top, center, formulas),
    rightToCenter: buildLine("Правая линия", matrixBase.diagonal.right, center, formulas),
    bottomToCenter: buildLine("Нижняя линия", matrixBase.diagonal.bottom, center, formulas),
  };

  const outerLines = {
    leftTopToCenter: buildLine("Левый верхний сектор", outerSquare.betweenLeftTop, center, formulas),
    topRightToCenter: buildLine("Правый верхний сектор", outerSquare.betweenTopRight, center, formulas),
    rightBottomToCenter: buildLine("Правый нижний сектор", outerSquare.betweenRightBottom, center, formulas),
    bottomLeftToCenter: buildLine("Левый нижний сектор", outerSquare.betweenBottomLeft, center, formulas),
  };

  return {
    diagonalLines,
    outerLines,
    mainLines: [...Object.values(diagonalLines), ...Object.values(outerLines)],
  };
}
