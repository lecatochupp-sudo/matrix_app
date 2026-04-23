// @ts-nocheck
function sumDigitsOnce(value) {
  return String(Math.abs(Number(value)))
    .split("")
    .filter((char) => /\d/.test(char))
    .reduce((total, char) => total + Number(char), 0);
}

export function normalizeTo22(value) {
  const numericValue = Math.trunc(Math.abs(Number(value) || 0));

  if (numericValue <= 22) {
    return numericValue;
  }

  let current = numericValue;

  while (current > 22) {
    current = sumDigitsOnce(current);
  }

  return current;
}

export function normalizeTo22Legacy(value) {
  let current = Math.trunc(Math.abs(Number(value) || 0));

  if (current > 22) {
    while (current > 22) {
      current -= 22;
    }
  }

  if (current === 0) {
    current = 22;
  }

  return current;
}

export function sumDigits(value) {
  return sumDigitsOnce(value);
}
