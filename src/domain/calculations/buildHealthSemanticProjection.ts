function codeBand(value) {
  if (value === null || value === undefined) {
    return "missing";
  }

  if (value >= 19) {
    return "high";
  }

  if (value >= 10) {
    return "medium";
  }

  return "low";
}

function pushSlot(slots, slot) {
  slots.push({
    chakraCode: null,
    energyCode: null,
    physicsCode: null,
    emotionsCode: null,
    breachCode: null,
    semanticTags: [],
    ...slot,
  });
}

export function buildHealthSemanticProjection(healthMap) {
  const slots = [];

  healthMap.chakra.entries.forEach((entry) => {
    pushSlot(slots, {
      slotId: `chakra-${entry.id}`,
      domain: "chakra",
      sourceId: entry.id,
      chakraCode: entry.count,
      semanticTags: [
        `domain:chakra`,
        `chakra:${entry.id}`,
        `count:${entry.count}`,
        `band:${codeBand(entry.count)}`,
      ],
      provenance: entry.provenance,
    });
  });

  healthMap.energy.timeline.forEach((entry, index) => {
    pushSlot(slots, {
      slotId: `energy-${index}`,
      domain: "energy",
      sourceId: entry.calendarYear,
      energyCode: entry.level,
      semanticTags: [
        `domain:energy`,
        `period:${entry.period}`,
        `calendar-year:${entry.calendarYear}`,
        `band:${codeBand(entry.level)}`,
      ],
      provenance: entry.provenance,
    });
  });

  healthMap.physics.primaryBodies.forEach((entry) => {
    pushSlot(slots, {
      slotId: `physics-${entry.id}`,
      domain: "physics",
      sourceId: entry.id,
      physicsCode: entry.bridgeCode,
      breachCode: entry.breachCode,
      semanticTags: [
        `domain:physics`,
        `body:${entry.id}`,
        `bridge:${entry.bridgeCode}`,
        `breach:${entry.breachCode}`,
        `band:${codeBand(entry.bridgeCode)}`,
      ],
      provenance: entry.provenance,
    });
  });

  healthMap.emotions.channels.forEach((entry) => {
    pushSlot(slots, {
      slotId: `emotions-${entry.id}`,
      domain: "emotions",
      sourceId: entry.id,
      emotionsCode: entry.bridgeCode,
      breachCode: entry.breachCode,
      semanticTags: [
        `domain:emotions`,
        `channel:${entry.id}`,
        `bridge:${entry.bridgeCode}`,
        `breach:${entry.breachCode}`,
        `band:${codeBand(entry.bridgeCode)}`,
      ],
      provenance: entry.provenance,
    });
  });

  healthMap.extra.breaches.forEach((entry) => {
    pushSlot(slots, {
      slotId: `breach-${entry.id}`,
      domain: "breach",
      sourceId: entry.id,
      breachCode: entry.breachCode,
      semanticTags: [
        `domain:breach`,
        `breach:${entry.id}`,
        `repair-left:${entry.breachLeftRepair}`,
        `repair-right:${entry.breachRightRepair}`,
        `band:${codeBand(entry.breachCode)}`,
      ],
      provenance: entry.provenance,
    });
  });

  return {
    provenance: healthMap.provenance,
    slots,
    warnings: healthMap.provider === "public-reconstruction"
      ? ["Health semantics are structural placeholders for the public provider."]
      : [],
  };
}
