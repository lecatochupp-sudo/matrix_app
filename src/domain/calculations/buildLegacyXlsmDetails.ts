import { firstDigit, lastNonZeroDigit } from "./parseBirthDate.ts";
import { buildLegacyCrystalCodes } from "./legacyXlsmRuntime.ts";

function calcTP(day, normalizeTo22Legacy) {
  if (day < 14) {
    return day;
  }

  if (day > 22) {
    return normalizeTo22Legacy(day);
  }

  return 0;
}

function calcOPV(day) {
  if (day >= 14 && day <= 22) {
    return day;
  }

  return 0;
}

function buildMandalaBranch(dayTaro, monthTaro, yearTaro, dopValue, normalizeTo22Legacy, sign) {
  const period1 = normalizeTo22Legacy(Math.abs(dayTaro + sign * monthTaro));
  const period2 = normalizeTo22Legacy(Math.abs(dayTaro + sign * yearTaro));
  const period3 = normalizeTo22Legacy(Math.abs(period1 + sign * period2));
  const period4 = normalizeTo22Legacy(Math.abs(monthTaro + sign * yearTaro));
  const main = normalizeTo22Legacy(period1 + period2 + period3 + period4);

  return {
    dopValue,
    periods: [period1, period2, period3, period4],
    main,
  };
}

export function buildLegacyXlsmDetails(matrixBase, formulas) {
  const { day, month, year } = matrixBase.meta;
  const dayTaro = formulas.normalizeTo22(day);
  const monthTaro = formulas.normalizeTo22(month);
  const yearTaro = formulas.normalizeTo22(formulas.sumDigits(year));
  const crystalCodes = buildLegacyCrystalCodes(day, month);

  const tp = calcTP(day, formulas.normalizeTo22);
  const opv = calcOPV(day);
  const workNumber1 = formulas.sumDigits(`${day}${month}${year}`);
  const workNumber2 = formulas.sumDigits(workNumber1);
  const workNumber3 = workNumber1 - 2 * firstDigit(day);
  const workNumber4 = formulas.sumDigits(workNumber3);
  const workNumber5 = workNumber1 + 2 * lastNonZeroDigit(year);
  const workNumber6 = formulas.sumDigits(workNumber5);

  const plusBranch = buildMandalaBranch(dayTaro, monthTaro, yearTaro, tp, formulas.normalizeTo22, 1);
  const minusBranch = buildMandalaBranch(dayTaro, monthTaro, yearTaro, opv, formulas.normalizeTo22, -1);
  const tail = formulas.normalizeTo22(Math.abs(minusBranch.main - plusBranch.main));
  const ageAnchor = 36 - formulas.sumDigits(workNumber2);

  return {
    provenance: "legacy-extracted",
    source: "xlsm-extracted",
    formulaNote: "Извлечено из Module1.bas и формул листов «Кристалл Судьбы» и «Мандала».",
    arcana: {
      dayTaro,
      monthTaro,
      yearTaro,
      tp,
      opv,
      tpDop: tp,
      opvDop: opv,
      tpCode: crystalCodes.tpCode,
      opvCode: crystalCodes.opvCode,
    },
    workNumbers: [
      workNumber1,
      workNumber2,
      workNumber3,
      workNumber4,
      workNumber5,
      workNumber6,
    ],
    periods: {
      plus: plusBranch,
      minus: minusBranch,
      tail,
      ageWindows: [
        `0-${ageAnchor}`,
        `${ageAnchor + 1}-${ageAnchor + 9}`,
        `${ageAnchor + 10}-${ageAnchor + 18}`,
        `${ageAnchor + 19}-и далее`,
      ],
    },
  };
}
