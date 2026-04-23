export function parseBirthDate(birthDate) {
  const match = String(birthDate).trim().match(/^(\d{2})\.(\d{2})\.(\d{4})$/);

  if (!match) {
    throw new Error("Используйте формат даты DD.MM.YYYY");
  }

  const [, dayRaw, monthRaw, yearRaw] = match;

  return {
    day: Number(dayRaw),
    month: Number(monthRaw),
    year: Number(yearRaw),
  };
}

export function firstDigit(value) {
  return Number(String(Math.abs(Number(value))).charAt(0) || 0);
}

export function lastNonZeroDigit(value) {
  const reversedDigits = String(Math.abs(Number(value))).split("").reverse();
  const foundDigit = reversedDigits.find((digit) => digit !== "0");

  return Number(foundDigit || 0);
}
