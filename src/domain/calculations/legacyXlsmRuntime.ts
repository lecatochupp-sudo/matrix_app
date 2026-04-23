import { normalizeTo22Legacy, sumDigits } from "./normalizeTo22";
import {
  addUtcYears,
  buildUtcDate,
  formatUtcDate,
  getUtcYear,
  subtractUtcDays,
  toReferenceDate,
} from "./referenceDate";

export function countNumber(source, number) {
  return String(source)
    .split("")
    .filter((char) => char !== " " && /\d/.test(char) && Number(char) === number)
    .length;
}

export function arrayRepeatNum(value, count) {
  if (count === 0) {
    return "нет";
  }

  return Array.from({ length: count }, () => `${value} `).join("").trim();
}

export function numberTo9(value) {
  let current = Math.abs(Number(value) || 0);

  while (current > 9) {
    current = sumDigits(current);
  }

  return current;
}

export function calcTpLegacy(day) {
  if (day < 14) {
    return day;
  }

  if (day > 22) {
    return normalizeTo22Legacy(day);
  }

  return 0;
}

export function calcOpvLegacy(day) {
  if (day >= 14 && day <= 22) {
    return day;
  }

  return 0;
}

export function solarDateLegacy(dobDate, otherDate) {
  let tmpDate = buildUtcDate(getUtcYear(otherDate), dobDate.getUTCMonth() + 1, dobDate.getUTCDate());

  if (tmpDate.getTime() > otherDate.getTime()) {
    tmpDate = buildUtcDate(getUtcYear(otherDate) - 1, dobDate.getUTCMonth() + 1, dobDate.getUTCDate());
  }

  return tmpDate;
}

export function karmicShadowLegacy(dobDate, otherDate, intervalYears) {
  if (!intervalYears) {
    return 1;
  }

  let currentDate = dobDate;
  let currentPolarity = 1;
  const targetDate = addUtcYears(otherDate, -intervalYears);

  while (currentDate.getTime() < targetDate.getTime()) {
    currentDate = addUtcYears(currentDate, intervalYears);
    currentPolarity *= -1;
  }

  return currentPolarity;
}

export function buildMandalaDigitSequences(day, month, year) {
  const paddedDate = `${String(day).padStart(2, "0")}${String(month).padStart(2, "0")}${year}`;
  const quotient = Number(paddedDate) / 7;
  const integerPart = Math.trunc(quotient);
  const fractionString = String(quotient).split(".")[1] || "";

  return {
    paddedDate,
    quotient,
    integerDigits: String(integerPart).padStart(7, "0").slice(0, 7),
    fractionDigits: fractionString.slice(0, 7).padEnd(7, "0"),
  };
}

export function buildLegacyEnergyPattern(day, month, year) {
  const product = day * month * year;
  const repeatedSequence = `${product}${product}`;
  const patternDigits = repeatedSequence
    .slice(0, 7)
    .split("")
    .map((digit) => Number(digit));

  return {
    product,
    repeatedSequence,
    patternDigits,
  };
}

export function buildLegacyCrystalCodes(day, month) {
  const dayTaro = normalizeTo22Legacy(day);
  const monthTaro = normalizeTo22Legacy(month);

  return {
    dayTaro,
    monthTaro,
    tpCode: normalizeTo22Legacy(dayTaro + monthTaro),
    opvCode: normalizeTo22Legacy(dayTaro - monthTaro),
  };
}

export function buildLegacyYearCycleBase(day, month, birthDate, referenceDate) {
  const normalizedReferenceDate = toReferenceDate(referenceDate);
  const currentSolarDate = solarDateLegacy(birthDate, normalizedReferenceDate);
  const currentSolarYear = getUtcYear(currentSolarDate);
  const currentCycleNumber = numberTo9(sumDigits(`${day}${month}${currentSolarYear}`));

  return {
    referenceDate: normalizedReferenceDate,
    currentSolarYear,
    currentCycleNumber,
    currentSolarDate: formatUtcDate(currentSolarDate),
  };
}

export function buildLegacyForecastDate(calendarYear, month, day) {
  return buildUtcDate(calendarYear, month, day);
}

export function buildLegacyShadowDate(calendarYear, month, day) {
  return subtractUtcDays(buildUtcDate(calendarYear, month, day), 1);
}
