const alphabetRegistry = {
  russian: {
    code: "russian",
    label: "Russian",
    alphabet: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
    vowels: "АУОЫИЭЯЮЁЕ",
    provenance: "exact",
  },
  english: {
    code: "english",
    label: "English",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    vowels: "AEIOUY",
    provenance: "exact",
  },
};

function uniqueCharacters(value) {
  return Array.from(new Set(String(value || "").split("")));
}

function detectAlphabetCode(value) {
  const source = String(value || "");

  if (/[А-ЯЁ]/i.test(source)) {
    return "russian";
  }

  if (/[A-Z]/i.test(source)) {
    return "english";
  }

  return null;
}

export function getAlphabetProfile(requestedCode, sampleValue = "") {
  const normalizedCode = requestedCode ? String(requestedCode).toLowerCase() : null;
  const detectedCode = detectAlphabetCode(sampleValue);
  const profile = alphabetRegistry[normalizedCode] || alphabetRegistry[detectedCode] || alphabetRegistry.russian;

  return {
    ...profile,
    requestedCode: normalizedCode,
    detectedCode,
  };
}

export function sanitizeName(value, alphabetProfile) {
  const upper = String(value || "").toUpperCase().trim();
  const allowedCharacters = uniqueCharacters(alphabetProfile.alphabet);
  const kept = [];
  const dropped = [];

  upper.split("").forEach((char) => {
    if (allowedCharacters.includes(char)) {
      kept.push(char);
    } else if (char && char !== " " && char !== "-") {
      dropped.push(char);
    }
  });

  return {
    original: String(value || ""),
    upper,
    sanitized: kept.join(""),
    droppedCharacters: uniqueCharacters(dropped),
  };
}

export function convertLetterToNumber(letter, alphabet) {
  const normalizedLetter = String(letter || "").toUpperCase();
  const normalizedAlphabet = String(alphabet || "").toUpperCase();
  let index = normalizedAlphabet.indexOf(normalizedLetter);

  if (index === -1) {
    return 0;
  }

  index += 1;

  if (index >= 9) {
    const modulo = index % 9;

    return modulo === 0 ? 9 : modulo;
  }

  return index;
}

export function convertLettersToNumber(value, alphabet) {
  return String(value || "")
    .toUpperCase()
    .split("")
    .reduce((total, char) => total + convertLetterToNumber(char, alphabet), 0);
}

export function lettersToNumberArray(value, alphabet) {
  return String(value || "")
    .toUpperCase()
    .split("")
    .filter(Boolean)
    .map((char) => convertLetterToNumber(char, alphabet));
}

export function vowelsToNumber(value, alphabetProfile) {
  const vowels = alphabetProfile.vowels;

  return String(value || "")
    .toUpperCase()
    .split("")
    .reduce((total, char) => {
      if (vowels.includes(char)) {
        return total + convertLetterToNumber(char, alphabetProfile.alphabet);
      }

      return total;
    }, 0);
}

export function consonantsToNumber(value, alphabetProfile) {
  const vowels = alphabetProfile.vowels;

  return String(value || "")
    .toUpperCase()
    .split("")
    .reduce((total, char) => {
      if (char && !vowels.includes(char)) {
        return total + convertLetterToNumber(char, alphabetProfile.alphabet);
      }

      return total;
    }, 0);
}
