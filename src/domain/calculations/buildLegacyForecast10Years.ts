import { normalizeTo22Legacy, sumDigits } from "./normalizeTo22\";
import {
  buildLegacyCrystalCodes,
  buildLegacyForecastDate,
  buildLegacyShadowDate,
  buildLegacyYearCycleBase,
  calcTpLegacy,
  calcOpvLegacy,
  karmicShadowLegacy,
} from "./legacyXlsmRuntime\";
import { buildUtcDate, formatUtcDate } from "./referenceDate\";

export function buildLegacyForecast10Years(matrixBase, context = {}) {
  const { day, month, year } = matrixBase.meta;
  const birthDate = buildUtcDate(year, month, day);
  const crystalCodes = buildLegacyCrystalCodes(day, month);
  const tpDop = calcTpLegacy(day);
  const opvDop = calcOpvLegacy(day);
  const cycleBase = buildLegacyYearCycleBase(day, month, birthDate, context.referenceDate);
  const resonanceMatrix = [
    context.legacyDetails?.arcana?.opv ?? 0,
    ...(context.legacyDetails?.periods?.minus?.periods || []),
    context.legacyDetails?.periods?.minus?.main ?? 0,
  ];
  const nameArcValue = context.nameArc?.nameArcNumbers?.nameArc ?? null;

  return {
    provider: "legacy-xlsm",
    provenance: "mixed",
    items: Array.from({ length: 10 }, (_, yearOffset) => {
      const calendarYear = cycleBase.currentSolarYear + yearOffset;
      const cycleStartDate = buildLegacyForecastDate(calendarYear, month, day);
      const shadowDate = buildLegacyShadowDate(calendarYear, month, day);
      const solarYear = cycleStartDate.getUTCFullYear();
      const westernCode = normalizeTo22Legacy(sumDigits(`${day}${month}${solarYear}`));
      const tarotCode = normalizeTo22Legacy(
        normalizeTo22Legacy(day) +
        normalizeTo22Legacy(month) +
        normalizeTo22Legacy(sumDigits(solarYear))
      );
      const karmicTail = normalizeTo22Legacy(Math.abs(westernCode - tarotCode));
      const shadowPolarity = karmicShadowLegacy(birthDate, shadowDate, crystalCodes.opvCode);
      const yearlyCycleNumber = ((cycleBase.currentCycleNumber - 1 + yearOffset) % 9) + 1;
      const nameAdjustedDerivedCode = nameArcValue === null
        ? null
        : Math.abs(normalizeTo22Legacy(westernCode + nameArcValue * shadowPolarity));
      const nameAdjustedEnergyCode = nameArcValue === null
        ? null
        : Math.abs(normalizeTo22Legacy(tarotCode + nameArcValue * shadowPolarity));
      const isMatrixResonant = resonanceMatrix.includes(westernCode) || resonanceMatrix.includes(tarotCode);
      const isNameAdjustedResonant = resonanceMatrix.includes(nameAdjustedDerivedCode) || resonanceMatrix.includes(nameAdjustedEnergyCode);

      return {
        age: calendarYear - year,
        yearOffset,
        calendarYear,
        energyCode: tarotCode,
        derivedCode: westernCode,
        provider: "legacy-xlsm",
        provenance: "legacy-extracted",
        rawDetails: {
          sourceSheets: ["Прогностика", "Кристалл Судьбы"],
          cycleStartDate: formatUtcDate(cycleStartDate),
          solarYear,
          tpCode: crystalCodes.tpCode,
          opvCode: crystalCodes.opvCode,
          tpDop,
          opvDop,
          westernCode,
          tarotCode,
          karmicTail,
          yearlyCycleNumber,
          shadowPolarity,
          shadowIntervalCode: crystalCodes.opvCode,
          nameArcUsed: nameArcValue,
          nameAdjustedDerivedCode,
          nameAdjustedEnergyCode,
          isMatrixResonant,
          isNameAdjustedResonant,
          nameArcAdjustedCode: nameAdjustedDerivedCode,
        },
      };
    }),
  };
}
