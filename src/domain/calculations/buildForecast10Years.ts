import { normalizeTo22, sumDigits } from "./normalizeTo22\";
import { getUtcYear, toReferenceDate } from "./referenceDate\";

export function buildForecast10Years(matrixBase, context = {}, nameArc = null) {
  const referenceDate = toReferenceDate(context.referenceDate);
  const referenceYear = getUtcYear(referenceDate);
  const center = matrixBase.diagonal.center;

  return {
    provider: "public-reconstruction",
    provenance: "reconstructed",
    items: Array.from({ length: 10 }, (_, yearOffset) => {
      const calendarYear = referenceYear + yearOffset;
      const energyCode = normalizeTo22(sumDigits(calendarYear) + center);

      return {
        age: calendarYear - matrixBase.meta.year,
        yearOffset,
        calendarYear,
        energyCode,
        derivedCode: null,
        provider: "public-reconstruction",
        provenance: "reconstructed",
        rawDetails: {
          formulaStatus: "placeholder",
          nameArcUsed: nameArc?.nameArcNumbers?.nameArc ?? null,
          nameAdjustedEnergyCode: null,
          nameAdjustedDerivedCode: null,
          isMatrixResonant: false,
          isNameAdjustedResonant: false,
          headline: energyCode % 2 === 0 ? "Год структурирования" : "Год раскрытия",
          description: energyCode % 2 === 0
            ? "Подходящий период для сборки систем, режима и устойчивых процессов."
            : "Подходящий период для новых контактов, идей и расширения траектории.",
        },
      };
    }),
  };
}
