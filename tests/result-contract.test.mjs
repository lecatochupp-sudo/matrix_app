import test from "node:test";
import assert from "node:assert/strict";

import { buildMatrixProfile } from "../src/domain/buildMatrixProfile.ts";

const referenceDate = "2026-04-22";
const nameInput = {
  personName: "Гульмира",
  firstName: "Гульмира",
  lastName: "Иванова",
  middleName: "Сергеевна",
  alphabetCode: "russian",
};

function assertProviderMeta(meta) {
  assert.equal(typeof meta.providerId, "string");
  assert.equal(typeof meta.providerLabel, "string");
  assert.equal(typeof meta.formulaMode, "string");
  assert.equal(typeof meta.extractionConfidence, "number");
  assert.ok(Array.isArray(meta.warnings));
  assert.ok(Array.isArray(meta.unsupportedSections));
}

function assertForecastItem(item) {
  assert.equal(typeof item.age, "number");
  assert.equal(typeof item.yearOffset, "number");
  assert.equal(typeof item.calendarYear, "number");
  assert.equal(typeof item.energyCode, "number");
  assert.ok(typeof item.derivedCode === "number" || item.derivedCode === null);
  assert.equal(typeof item.provider, "string");
  assert.equal(typeof item.provenance, "string");
  assert.equal(typeof item.rawDetails, "object");
}

function assertHealthMap(map) {
  assert.equal(typeof map.provider, "string");
  assert.equal(typeof map.provenance, "string");
  assert.equal(typeof map.chakra, "object");
  assert.equal(typeof map.energy, "object");
  assert.equal(typeof map.physics, "object");
  assert.equal(typeof map.emotions, "object");
  assert.equal(typeof map.extra, "object");
  assert.equal(typeof map.semanticProjection, "object");
  assert.ok(Array.isArray(map.chakra.entries));
  assert.ok(Array.isArray(map.energy.timeline));
  assert.ok(Array.isArray(map.physics.primaryBodies));
  assert.ok(Array.isArray(map.emotions.channels));
  assert.ok(Array.isArray(map.semanticProjection.slots));
}

function assertNameArcLayer(layer) {
  assert.equal(typeof layer.provider, "string");
  assert.equal(typeof layer.provenance, "string");
  assert.equal(typeof layer.input, "object");
  assert.equal(typeof layer.normalizedName, "object");
  assert.equal(typeof layer.nameArcNumbers, "object");
  assert.equal(typeof layer.nameDerivedForecastFields, "object");
  assert.ok(Array.isArray(layer.warnings));
  assert.ok(Array.isArray(layer.nameDerivedForecastFields.supportedScopes));
  assert.ok(Array.isArray(layer.nameDerivedForecastFields.resonanceMatrix));
}

function assertResultContract(result) {
  assert.equal(typeof result.birthDate, "string");
  assert.equal(typeof result.core, "object");
  assert.equal(typeof result.matrixGeometry, "object");
  assert.equal(typeof result.healthMap, "object");
  assert.equal(typeof result.forecast10Years, "object");
  assert.equal(typeof result.nameArc, "object");
  assert.equal(typeof result.interpretationKeys, "object");
  assert.equal(typeof result.contentSignals, "object");
  assert.ok("legacyDetails" in result);
  assertProviderMeta(result.providerMeta);
  assert.equal(typeof result.core.referenceDate, "string");
  assert.equal(typeof result.core.numbers.center, "number");
  assert.equal(typeof result.matrixGeometry.outerSquare.betweenLeftTop, "number");
  assert.ok(Array.isArray(result.matrixGeometry.innerPoints.mainLines));
  assertHealthMap(result.healthMap);
  assertNameArcLayer(result.nameArc);
  assert.ok(Array.isArray(result.forecast10Years.items));
  assert.ok(Array.isArray(result.interpretationKeys.blocks));
  assert.ok(Array.isArray(result.contentSignals.blocks));
  result.forecast10Years.items.forEach(assertForecastItem);
}

test("public provider returns stable shape", () => {
  const result = buildMatrixProfile("11.06.1987", "public-reconstruction", { referenceDate });

  assertResultContract(result);
  assert.equal(result.providerMeta.providerId, "public-reconstruction");
  assert.equal(result.healthMap.provider, "public-reconstruction");
  assert.equal(result.forecast10Years.items.length, 10);
});

test("legacy provider returns stable shape", () => {
  const result = buildMatrixProfile("11.06.1987", "legacy-xlsm", { referenceDate });

  assertResultContract(result);
  assert.equal(result.providerMeta.providerId, "legacy-xlsm");
  assert.equal(result.healthMap.provider, "legacy-xlsm");
  assert.equal(result.forecast10Years.items.length, 10);
  assert.equal(result.legacyDetails.provenance, "legacy-extracted");
});

test("health map contract valid for both providers", () => {
  const publicResult = buildMatrixProfile("27.10.1999", "public-reconstruction", { referenceDate });
  const legacyResult = buildMatrixProfile("27.10.1999", "legacy-xlsm", { referenceDate });

  assertHealthMap(publicResult.healthMap);
  assertHealthMap(legacyResult.healthMap);
  assert.ok(Array.isArray(legacyResult.healthMap.chakra.entries));
  assert.ok(Array.isArray(legacyResult.healthMap.extra.breaches));
});

test("forecast contract valid for both providers", () => {
  const publicResult = buildMatrixProfile("27.10.1999", "public-reconstruction", { referenceDate });
  const legacyResult = buildMatrixProfile("27.10.1999", "legacy-xlsm", { referenceDate });

  publicResult.forecast10Years.items.forEach(assertForecastItem);
  legacyResult.forecast10Years.items.forEach(assertForecastItem);
  assert.equal(publicResult.forecast10Years.items[0].yearOffset, 0);
  assert.equal(legacyResult.forecast10Years.items[0].yearOffset, 0);
});

test("NameArc layer stable shape", () => {
  const resultWithName = buildMatrixProfile("11.06.1987", "legacy-xlsm", {
    referenceDate,
    nameInput,
  });
  const resultWithoutName = buildMatrixProfile("11.06.1987", "legacy-xlsm", {
    referenceDate,
  });

  assertNameArcLayer(resultWithName.nameArc);
  assertNameArcLayer(resultWithoutName.nameArc);
  assert.equal(resultWithName.nameArc.provenance, "exact");
  assert.equal(resultWithoutName.nameArc.provenance, "placeholder");
  assert.equal(resultWithName.nameArc.nameArcNumbers.nameArc, 8);
});

test("legacy result keeps compatible contract after adding interpretation keys", () => {
  const result = buildMatrixProfile("11.06.1987", "legacy-xlsm", {
    referenceDate,
    nameInput,
  });

  assertResultContract(result);
  assert.ok(result.interpretationKeys.arcana.some((key) => key === "arcana.tp:17"));
  assert.ok(result.interpretationKeys.health.some((key) => key.startsWith("domain:physics")));
  assert.ok(result.contentSignals.arcana.some((signal) => signal.key === "legacy.tpCode"));
});

test("health semantic projection stable", () => {
  const publicResult = buildMatrixProfile("11.06.1987", "public-reconstruction", { referenceDate });
  const legacyResult = buildMatrixProfile("11.06.1987", "legacy-xlsm", { referenceDate });

  assert.ok(publicResult.healthMap.semanticProjection.slots.length > 0);
  assert.ok(legacyResult.healthMap.semanticProjection.slots.length > 0);
  assert.equal(legacyResult.healthMap.semanticProjection.slots[0].domain, "chakra");
});

test("content-ready keys generated for both providers", () => {
  const publicResult = buildMatrixProfile("27.10.1999", "public-reconstruction", {
    referenceDate,
    nameInput,
  });
  const legacyResult = buildMatrixProfile("27.10.1999", "legacy-xlsm", {
    referenceDate,
    nameInput,
  });

  assert.ok(publicResult.interpretationKeys.blocks.length > 0);
  assert.ok(legacyResult.interpretationKeys.blocks.length > 0);
  assert.ok(publicResult.contentSignals.blocks.length > 0);
  assert.ok(legacyResult.contentSignals.blocks.length > 0);
});

test("warnings are emitted when fields are reconstructed or placeholder", () => {
  const publicResult = buildMatrixProfile("11.06.1987", "public-reconstruction", {
    referenceDate,
    nameInput,
  });
  const legacyWithoutName = buildMatrixProfile("11.06.1987", "legacy-xlsm", {
    referenceDate,
  });

  assert.ok(publicResult.providerMeta.warnings.length > 0);
  assert.ok(legacyWithoutName.providerMeta.warnings.some((warning) => warning.includes("NameArc")));
});

test("regression case 11.06.1987", () => {
  const publicResult = buildMatrixProfile("11.06.1987", "public-reconstruction", { referenceDate });
  const legacyResult = buildMatrixProfile("11.06.1987", "legacy-xlsm", {
    referenceDate,
    nameInput,
  });

  assert.deepEqual(publicResult.core.numbers, {
    left: 11,
    top: 6,
    right: 7,
    bottom: 6,
    center: 3,
  });

  assert.deepEqual(legacyResult.core.numbers, {
    left: 11,
    top: 6,
    right: 3,
    bottom: 20,
    center: 18,
  });

  assert.deepEqual(legacyResult.legacyDetails.workNumbers, [33, 6, 31, 4, 47, 11]);
  assert.equal(legacyResult.legacyDetails.arcana.tpCode, 17);
  assert.equal(legacyResult.legacyDetails.arcana.opvCode, 5);
  assert.equal(legacyResult.healthMap.extra.breaches[3].breachCode, 21);
  assert.equal(legacyResult.forecast10Years.items[0].rawDetails.opvCode, 5);
  assert.equal(legacyResult.forecast10Years.items[0].rawDetails.tpDop, 11);
  assert.equal(legacyResult.forecast10Years.items[0].rawDetails.nameAdjustedDerivedCode, 9);
});

test("regression case 27.10.1999", () => {
  const publicResult = buildMatrixProfile("27.10.1999", "public-reconstruction", { referenceDate });
  const legacyResult = buildMatrixProfile("27.10.1999", "legacy-xlsm", {
    referenceDate,
    nameInput,
  });

  assert.deepEqual(publicResult.core.numbers, {
    left: 9,
    top: 10,
    right: 10,
    bottom: 11,
    center: 4,
  });

  assert.deepEqual(legacyResult.core.numbers, {
    left: 5,
    top: 10,
    right: 6,
    bottom: 21,
    center: 20,
  });

  assert.deepEqual(legacyResult.legacyDetails.workNumbers, [38, 11, 34, 7, 56, 11]);
  assert.equal(legacyResult.legacyDetails.arcana.tpCode, 15);
  assert.equal(legacyResult.legacyDetails.arcana.opvCode, 5);
  assert.equal(legacyResult.forecast10Years.items[0].rawDetails.opvCode, 5);
  assert.equal(legacyResult.forecast10Years.items[0].rawDetails.tpDop, 5);
});
