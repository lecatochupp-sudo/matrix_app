// @ts-nocheck
export function toReferenceDate(referenceDate) {
  if (referenceDate instanceof Date) {
    return new Date(Date.UTC(
      referenceDate.getUTCFullYear(),
      referenceDate.getUTCMonth(),
      referenceDate.getUTCDate(),
      12,
      0,
      0,
    ));
  }

  if (typeof referenceDate === "string") {
    const match = referenceDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (match) {
      return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12, 0, 0));
    }
  }

  const now = new Date();

  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 12, 0, 0));
}

export function getUtcYear(date) {
  return date.getUTCFullYear();
}

export function getUtcMonth(date) {
  return date.getUTCMonth() + 1;
}

export function getUtcDay(date) {
  return date.getUTCDate();
}

export function buildUtcDate(year, month, day) {
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

export function addUtcYears(date, years) {
  return buildUtcDate(getUtcYear(date) + years, getUtcMonth(date), getUtcDay(date));
}

export function subtractUtcDays(date, days) {
  return new Date(date.getTime() - days * 24 * 60 * 60 * 1000);
}

export function formatUtcDate(date) {
  const year = getUtcYear(date);
  const month = String(getUtcMonth(date)).padStart(2, "0");
  const day = String(getUtcDay(date)).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
