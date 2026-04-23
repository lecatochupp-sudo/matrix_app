import { normalizeTo22 } from "./normalizeTo22\";
import { buildHealthSemanticProjection } from "./buildHealthSemanticProjection\";

function bodyEntry(id, label, value, details, provenance) {
  return {
    id,
    label,
    bridgeCode: value,
    leftLevel: value,
    rightLevel: value,
    breachCode: value,
    breachLeftRepair: value,
    breachRightRepair: value,
    provenance,
    rawDetails: details,
  };
}

export function buildHealthMap(matrixBase, outerSquare, innerPoints) {
  const { left, top, right, bottom, center } = matrixBase.diagonal;

  const physicalValue = normalizeTo22(bottom + center);
  const energyValue = normalizeTo22(left + top + outerSquare.betweenLeftTop);
  const emotionValue = normalizeTo22(innerPoints.diagonalLines.leftToCenter.p1 + innerPoints.diagonalLines.topToCenter.p2);
  const mentalValue = normalizeTo22(right + center + outerSquare.betweenTopRight);

  const healthMap = {
    provider: "public-reconstruction",
    provenance: "mixed",
    chakra: {
      provenance: "placeholder",
      entries: [],
      squareFlags: [],
      rawDetails: {
        note: "TODO(real formulas)",
      },
    },
    energy: {
      provenance: "placeholder",
      graphSeedNumber: null,
      patternDigits: [],
      timeline: [],
      rawDetails: {
        note: "TODO(real formulas)",
      },
    },
    physics: {
      provenance: "reconstructed",
      primaryBodies: [
        bodyEntry(1, "Физический ресурс", physicalValue, { source: "public reconstruction" }, "reconstructed"),
        bodyEntry(2, "Энергетический тонус", energyValue, { source: "public reconstruction" }, "reconstructed"),
      ],
    },
    emotions: {
      provenance: "reconstructed",
      channels: [
        bodyEntry(3, "Эмоциональный фон", emotionValue, { source: "public reconstruction" }, "reconstructed"),
        bodyEntry(4, "Ментальная устойчивость", mentalValue, { source: "public reconstruction" }, "reconstructed"),
      ],
    },
    extra: {
      provenance: "placeholder",
      derivedBodies: [],
      breaches: [],
      notes: ["TODO(real formulas)"],
    },
  };

  healthMap.semanticProjection = buildHealthSemanticProjection(healthMap);

  return healthMap;
}
