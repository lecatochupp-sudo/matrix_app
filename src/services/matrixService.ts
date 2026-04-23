import { buildMatrixBase } from "@/domain/calculations/buildMatrixBase";
import { parseBirthDate } from "@/domain/calculations/parseBirthDate";

export async function calculateMatrix(birthDate: string, gender: string) {
  // Вызываем твою оригинальную функцию, передавая ей строку даты
  const base = buildMatrixBase(birthDate);
  const { year } = parseBirthDate(birthDate);
  
  // Возвращаем структуру для UI
  return {
    base,
    info: {
        birthDate,
        age: new Date().getFullYear() - year
    }
  };
}
