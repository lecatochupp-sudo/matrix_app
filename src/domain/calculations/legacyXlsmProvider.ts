// @ts-nocheck
/**
 * Реализация NumberTo22 из Excel файла:
 * "если intSource > 22, то повторять intSource = intSource - 22, если 0 вернуть 22"
 */
export function legacyNumberTo22(value: number): number {
    let result = Math.abs(Math.floor(value));
    if (result === 0) return 0;
    
    while (result > 22) {
        result -= 22;
    }
    
    return result === 0 ? 22 : result;
}

/**
 * Реализация суммы цифр до однозначного или до 22 (в зависимости от контекста)
 */
export function legacySumNumbers(value: number): number {
    const s = String(Math.abs(value));
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
        sum += parseInt(s[i]);
    }
    return sum;
}

export function calculateLegacyMatrix(day: number, month: number, year: number) {
    const d3 = legacyNumberTo22(day);
    const d4 = legacyNumberTo22(month);
    const d5 = legacyNumberTo22(legacySumNumbers(year));
    
    // Формулы из листа "Мандала"
    const i4 = legacyNumberTo22(d3 + d4);
    const j4 = legacyNumberTo22(d3 + d5);
    const k4 = legacyNumberTo22(i4 + j4);
    const l4 = legacyNumberTo22(d4 + d5);
    
    const m4 = legacyNumberTo22(i4 + j4 + k4 + l4);
    
    return {
        diagonal: {
            left: d3,
            top: d4,
            right: d5,
            bottom: legacyNumberTo22(d3 + d4 + d5), // Базовая карма
            center: m4
        },
        mandala: {
            i4, j4, k4, l4, m4
        }
    };
}
