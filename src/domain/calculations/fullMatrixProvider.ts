// @ts-nocheck
import { legacyNumberTo22, legacySumNumbers } from "./legacyXlsmProvider";

export function calculateFullMatrix(day: number, month: number, year: number) {
  const d3 = legacyNumberTo22(day);
  const d4 = legacyNumberTo22(month);
  const d5 = legacyNumberTo22(legacySumNumbers(year));
  const bottom = legacyNumberTo22(d3 + d4 + d5);
  const center = legacyNumberTo22(d3 + d4 + d5 + bottom);

  // Канал Отношений (три точки под сердцем)
  const rel1 = legacyNumberTo22(center + bottom); // Вход
  const rel2 = legacyNumberTo22(rel1 + bottom); 
  const rel3 = legacyNumberTo22(rel1 + rel2);

  // Канал Денег (три точки справа)
  const mon1 = legacyNumberTo22(center + d5); // Вход
  const mon2 = legacyNumberTo22(mon1 + d5);
  const mon3 = legacyNumberTo22(mon1 + mon2);

  // Родовые задачи (диагонали)
  const ancestral = {
    topRight: legacyNumberTo22(d4 + d5),
    bottomRight: legacyNumberTo22(d5 + bottom),
    bottomLeft: legacyNumberTo22(bottom + d3),
    topLeft: legacyNumberTo22(d3 + d4)
  };

  // Предназначения
  const heaven = legacyNumberTo22(d4 + bottom);
  const earth = legacyNumberTo22(d3 + d5);
  const social = legacyNumberTo22(heaven + earth);

  return {
    diagonal: { left: d3, top: d4, right: d5, bottom, center },
    money: { entrance: mon1, main: mon2, result: mon3 },
    love: { entrance: rel1, main: rel2, result: rel3 },
    ancestral,
    destiny: { heaven, earth, social },
    health: {
      chakra7: d4,
      chakra6: legacyNumberTo22(d4 + center),
      chakra5: legacyNumberTo22(d4 + (legacyNumberTo22(d4 + center))),
      chakra4: center,
      chakra3: legacyNumberTo22(center + bottom),
      chakra2: legacyNumberTo22(center + (legacyNumberTo22(center + bottom))),
      chakra1: bottom
    }
  };
}
