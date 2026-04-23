import { normalizeTo22Legacy } from "./normalizeTo22";
import { buildLegacyEnergyPattern, buildMandalaDigitSequences, countNumber, arrayRepeatNum } from "./legacyXlsmRuntime";
import { buildHealthSemanticProjection } from "./buildHealthSemanticProjection";
import { parseBirthDate } from "./parseBirthDate";
import { getUtcYear, toReferenceDate } from "./referenceDate";

const bodyLabels = [
  "Физическое тело",
  "Эфирное тело",
  "Астральное тело",
  "Ментальное тело",
  "Кармическое тело",
  "Интуитивное тело",
  "Программное тело",
];

function buildMandalaBreachCode(leftDigit, rightDigit) {
  return Math.abs(
    normalizeTo22Legacy(
      normalizeTo22Legacy(leftDigit) - normalizeTo22Legacy(rightDigit)
    )
  );
}

function chakraSquareFlags(x42) {
  return [
    {
      id: "square-1",
      isActive: countNumber(x42, 4) === 0 && countNumber(x42, 5) === 0 && countNumber(x42, 2) === 0 && countNumber(x42, 1) > 0,
      provenance: "legacy-extracted",
      rawDetails: { sourceCell: "Z82", sourceSequence: "X42" },
    },
    {
      id: "square-2",
      isActive: countNumber(x42, 6) === 0 && countNumber(x42, 5) === 0 && countNumber(x42, 2) === 0 && countNumber(x42, 3) > 0,
      provenance: "legacy-extracted",
      rawDetails: { sourceCell: "Z83", sourceSequence: "X42" },
    },
    {
      id: "square-3",
      isActive: countNumber(x42, 4) === 0 && countNumber(x42, 5) === 0 && countNumber(x42, 8) === 0 && countNumber(x42, 7) > 0,
      provenance: "legacy-extracted",
      rawDetails: { sourceCell: "Z84", sourceSequence: "X42" },
    },
    {
      id: "square-4",
      isActive: countNumber(x42, 6) === 0 && countNumber(x42, 5) === 0 && countNumber(x42, 8) === 0 && countNumber(x42, 9) > 0,
      provenance: "legacy-extracted",
      rawDetails: { sourceCell: "Z85", sourceSequence: "X42" },
    },
  ];
}

function buildBodyEntries(day, month, year) {
  const sequences = buildMandalaDigitSequences(day, month, year);
  const leftDigits = sequences.integerDigits.split("").map((digit) => Number(digit));
  const rightDigits = sequences.fractionDigits.split("").map((digit) => Number(digit));

  return bodyLabels.map((label, index) => {
    const leftDigit = leftDigits[index];
    const rightDigit = rightDigits[rightDigits.length - 1 - index];
    const bridge = leftDigit + rightDigit;
    const leftLevel = normalizeTo22Legacy(bridge + leftDigit);
    const rightLevel = normalizeTo22Legacy(rightDigit + bridge);
    const breach = buildMandalaBreachCode(leftDigit, rightDigit);
    const breachLeftRepair = normalizeTo22Legacy(leftDigit + breach);
    const breachRightRepair = normalizeTo22Legacy(rightDigit + breach);

    return {
      id: index + 1,
      label,
      provenance: "reconstructed",
      rawDetails: {
        sourceSheet: "Мандала",
        leftDigit,
        rightDigit,
        leftDigitNormalized: normalizeTo22Legacy(leftDigit),
        rightDigitNormalized: normalizeTo22Legacy(rightDigit),
        bridge,
        integerDigits: sequences.integerDigits,
        fractionDigits: sequences.fractionDigits,
      },
      bridgeCode: normalizeTo22Legacy(bridge),
      leftLevel,
      rightLevel,
      breachCode: breach,
      breachLeftRepair,
      breachRightRepair,
    };
  });
}

export function buildLegacyHealthMap(matrixBase, legacyDetails, context = {}) {
  const { day, month, year } = parseBirthDate(matrixBase.birthDate);
  const workNumbers = legacyDetails.workNumbers;
  const x42 = `${day}${month}${year}`;
  const x52 = `${x42}${workNumbers[0]}${workNumbers[1]}${Math.abs(workNumbers[2])}${Math.abs(workNumbers[3])}`;
  const referenceDate = toReferenceDate(context.referenceDate);
  const energyPattern = buildLegacyEnergyPattern(day, month, year);
  const bodyEntries = buildBodyEntries(day, month, year);

  const healthMap = {
    provider: "legacy-xlsm",
    provenance: "mixed",
    chakra: {
      provenance: "legacy-extracted",
      entries: Array.from({ length: 9 }, (_, index) => {
        const digit = index + 1;
        const count = countNumber(x52, digit);

        return {
          id: digit,
          label: `Чакра ${digit}`,
          count,
          repeatedText: arrayRepeatNum(String(digit), count),
          provenance: "legacy-extracted",
          rawDetails: {
            sourceCellFamily: "AB82:AD88",
            sourceSequence: "X52",
            digit,
          },
        };
      }),
      squareFlags: chakraSquareFlags(x42),
      rawDetails: {
        x42,
        x52,
        sourceSheet: "Кристалл Судьбы",
      },
    },
    energy: {
      provenance: "legacy-extracted",
      graphSeedNumber: energyPattern.product,
      patternDigits: energyPattern.patternDigits,
      timeline: Array.from({ length: 10 }, (_, offset) => {
        const calendarYear = getUtcYear(referenceDate) + offset;
        const period = ((calendarYear - matrixBase.meta.year) % 7 + 7) % 7 + 1;
        const level = energyPattern.patternDigits[period - 1] ?? null;

        return {
          calendarYear,
          period,
          level,
          provenance: "legacy-extracted",
          rawDetails: {
            sourceSheet: "Кристалл Судьбы",
            sourceRange: "AE314:AG432",
          },
        };
      }),
      rawDetails: {
        repeatedSequence: energyPattern.repeatedSequence,
      },
    },
    physics: {
      provenance: "reconstructed",
      primaryBodies: bodyEntries.slice(0, 2),
    },
    emotions: {
      provenance: "reconstructed",
      channels: bodyEntries.slice(2, 4),
    },
    extra: {
      provenance: "mixed",
      derivedBodies: bodyEntries.slice(4),
      breaches: bodyEntries.map((entry) => ({
        id: entry.id,
        label: entry.label,
        breachCode: entry.breachCode,
        breachLeftRepair: entry.breachLeftRepair,
        breachRightRepair: entry.breachRightRepair,
        provenance: "reconstructed",
      })),
      notes: [
        "Chakra square extracted from Crystal sheet.",
        "Body levels reconstructed from Mandala formulas and digit sequences.",
      ],
    },
  };

  healthMap.semanticProjection = buildHealthSemanticProjection(healthMap);

  return healthMap;
}
