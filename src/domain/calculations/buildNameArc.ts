import { numberTo9 } from "./legacyXlsmRuntime";
import {
  consonantsToNumber,
  convertLettersToNumber,
  getAlphabetProfile,
  lettersToNumberArray,
  sanitizeName,
  vowelsToNumber,
} from "./nameRuntime";

function normalizeNameInput(nameInput) {
  if (!nameInput) {
    return {
      personName: "",
      firstName: "",
      lastName: "",
      middleName: "",
      fullName: "",
      alphabetCode: null,
      localeHint: null,
    };
  }

  if (typeof nameInput === "string") {
    return {
      personName: nameInput,
      firstName: "",
      lastName: "",
      middleName: "",
      fullName: nameInput,
      alphabetCode: null,
      localeHint: null,
    };
  }

  const firstName = String(nameInput.firstName || "").trim();
  const lastName = String(nameInput.lastName || "").trim();
  const middleName = String(nameInput.middleName || "").trim();
  const derivedFullName = [lastName, firstName, middleName].filter(Boolean).join(" ").trim();

  return {
    personName: String(nameInput.personName || "").trim(),
    firstName,
    lastName,
    middleName,
    fullName: String(nameInput.fullName || derivedFullName).trim(),
    alphabetCode: nameInput.alphabetCode || null,
    localeHint: nameInput.localeHint || null,
  };
}

function buildLetterEntries(source, alphabetProfile) {
  const codes = lettersToNumberArray(source.sanitized, alphabetProfile.alphabet);

  return source.sanitized.split("").map((char, index) => ({
    char,
    code: codes[index] || 0,
    isVowel: alphabetProfile.vowels.includes(char),
    position: index + 1,
  }));
}

function computeNormalizedPart(value, alphabetProfile) {
  const sanitized = sanitizeName(value, alphabetProfile);

  return {
    ...sanitized,
    letters: buildLetterEntries(sanitized, alphabetProfile),
  };
}

export function buildNameArc(context = {}, formulas = {}, providerId = "legacy-xlsm") {
  const normalizeTo22 = formulas.normalizeTo22;
  const nameInput = normalizeNameInput(context.nameInput);
  const sampleName = nameInput.personName || nameInput.fullName || nameInput.firstName;
  const alphabetProfile = getAlphabetProfile(nameInput.alphabetCode, sampleName);
  const warnings = [];

  if (!sampleName) {
    warnings.push("NameArc inputs are missing. Name-dependent fields use placeholder values.");

    return {
      provider: providerId,
      provenance: "placeholder",
      input: nameInput,
      normalizedName: {
        alphabetCode: alphabetProfile.code,
        alphabetLabel: alphabetProfile.label,
        personName: computeNormalizedPart("", alphabetProfile),
        firstName: computeNormalizedPart("", alphabetProfile),
        lastName: computeNormalizedPart("", alphabetProfile),
        middleName: computeNormalizedPart("", alphabetProfile),
        fullName: computeNormalizedPart("", alphabetProfile),
      },
      nameArcNumbers: {
        nameArc: null,
        firstNameCode: null,
        lastNameCode: null,
        middleNameCode: null,
        fullNameCode: null,
        fullNameCode9: null,
        fullNameVowelsCode9: null,
        fullNameConsonantsCode9: null,
        taroNameCode: null,
      },
      nameDerivedForecastFields: {
        provenance: "placeholder",
        supportedScopes: ["forecast10Years.items[].rawDetails.nameAdjustedDerivedCode"],
        resonanceMatrix: [],
        warnings: [...warnings],
      },
      warnings,
    };
  }

  const normalizedName = {
    alphabetCode: alphabetProfile.code,
    alphabetLabel: alphabetProfile.label,
    personName: computeNormalizedPart(nameInput.personName || nameInput.firstName || nameInput.fullName, alphabetProfile),
    firstName: computeNormalizedPart(nameInput.firstName, alphabetProfile),
    lastName: computeNormalizedPart(nameInput.lastName, alphabetProfile),
    middleName: computeNormalizedPart(nameInput.middleName, alphabetProfile),
    fullName: computeNormalizedPart(
      nameInput.fullName || [nameInput.lastName, nameInput.firstName, nameInput.middleName].filter(Boolean).join(""),
      alphabetProfile,
    ),
  };

  const droppedCharacters = [
    ...normalizedName.personName.droppedCharacters,
    ...normalizedName.firstName.droppedCharacters,
    ...normalizedName.lastName.droppedCharacters,
    ...normalizedName.middleName.droppedCharacters,
    ...normalizedName.fullName.droppedCharacters,
  ];

  if (droppedCharacters.length > 0) {
    warnings.push(`Unsupported name characters were dropped: ${droppedCharacters.join(", ")}.`);
  }

  const exactPersonNameProvided = Boolean(nameInput.personName);
  const provenance = providerId === "legacy-xlsm" && exactPersonNameProvided ? "exact" : "reconstructed";

  if (providerId === "legacy-xlsm" && !exactPersonNameProvided) {
    warnings.push("NameArc uses fallback name source because prognostics-specific personName was not provided.");
  }

  if (providerId !== "legacy-xlsm") {
    warnings.push("NameArc for the public provider is reconstructed because normalization mode differs from XLSM.");
  }

  const personNameRaw = convertLettersToNumber(normalizedName.personName.sanitized, alphabetProfile.alphabet);
  const firstNameRaw = convertLettersToNumber(normalizedName.firstName.sanitized, alphabetProfile.alphabet);
  const lastNameRaw = convertLettersToNumber(normalizedName.lastName.sanitized, alphabetProfile.alphabet);
  const middleNameRaw = convertLettersToNumber(normalizedName.middleName.sanitized, alphabetProfile.alphabet);
  const fullNameRaw = convertLettersToNumber(normalizedName.fullName.sanitized, alphabetProfile.alphabet);
  const fullNameVowelsRaw = vowelsToNumber(normalizedName.fullName.sanitized, alphabetProfile);
  const fullNameConsonantsRaw = consonantsToNumber(normalizedName.fullName.sanitized, alphabetProfile);

  return {
    provider: providerId,
    provenance,
    input: nameInput,
    normalizedName,
    nameArcNumbers: {
      nameArc: normalizeTo22(personNameRaw),
      firstNameCode: normalizedName.firstName.sanitized ? normalizeTo22(firstNameRaw) : null,
      lastNameCode: normalizedName.lastName.sanitized ? normalizeTo22(lastNameRaw) : null,
      middleNameCode: normalizedName.middleName.sanitized ? normalizeTo22(middleNameRaw) : null,
      fullNameCode: normalizedName.fullName.sanitized ? normalizeTo22(fullNameRaw) : null,
      fullNameCode9: normalizedName.fullName.sanitized ? numberTo9(fullNameRaw) : null,
      fullNameVowelsCode9: normalizedName.fullName.sanitized ? numberTo9(fullNameVowelsRaw) : null,
      fullNameConsonantsCode9: normalizedName.fullName.sanitized ? numberTo9(fullNameConsonantsRaw) : null,
      taroNameCode: normalizedName.firstName.sanitized ? normalizeTo22(firstNameRaw) : null,
    },
    nameDerivedForecastFields: {
      provenance,
      supportedScopes: [
        "forecast10Years.items[].rawDetails.nameAdjustedDerivedCode",
        "forecast10Years.items[].rawDetails.nameAdjustedEnergyCode",
      ],
      resonanceMatrix: [],
      warnings: [...warnings],
    },
    warnings,
  };
}
