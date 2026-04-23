// @ts-nocheck
/**
 * Расширенная карта здоровья по Excel
 */
import { legacyNumberTo22 } from "./legacyXlsmProvider";

export function calculateHealthDetailed(data: any) {
    const { diagonal, health } = data;
    
    // В Excel для каждой чакры есть 3 параметра: Физика, Энергия, Эмоции
    // Эмоции (Итог) = Физика + Энергия
    
    const calculateChakraRow = (v1: number, v2: number) => {
        const fiz = v1;
        const nrg = v2;
        const emo = legacyNumberTo22(fiz + nrg);
        return { fiz, nrg, emo };
    };

    return [
        { name: "Сахасрара", ...calculateChakraRow(data.health.chakra7, data.health.chakra7) },
        { name: "Аджна", ...calculateChakraRow(data.health.chakra6, data.health.chakra6) },
        { name: "Вишудха", ...calculateChakraRow(data.health.chakra5, data.health.chakra5) },
        { name: "Анахата", ...calculateChakraRow(data.health.chakra4, data.health.chakra4) },
        { name: "Манипура", ...calculateChakraRow(data.health.chakra3, data.health.chakra3) },
        { name: "Свадхистана", ...calculateChakraRow(data.health.chakra2, data.health.chakra2) },
        { name: "Муладхара", ...calculateChakraRow(data.health.chakra1, data.health.chakra1) },
    ];
}
