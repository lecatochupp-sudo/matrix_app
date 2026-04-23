import { normalizeTo22, sumDigits } from "./normalizeTo22\";
import { parseBirthDate } from "./parseBirthDate\";

export function buildMatrixBase(birthDate, formulas = { normalizeTo22, sumDigits }) {
  const { day, month, year } = parseBirthDate(birthDate);

  const left = formulas.normalizeTo22(day);
  const top = formulas.normalizeTo22(month);
  const right = formulas.normalizeTo22(formulas.sumDigits(year));
  const bottom = formulas.normalizeTo22(left + top + right);
  const center = formulas.normalizeTo22(left + top + right + bottom);

  return {
    birthDate,
    meta: {
      day,
      month,
      year,
      yearDigitSum: formulas.sumDigits(year),
    },
    diagonal: {
      left,
      top,
      right,
      bottom,
      center,
    },
  };
}
