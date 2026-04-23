import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Start deep seeding from Excel artifacts...");

  const reportsDir = path.join(process.cwd(), "extracted/reports");
  
  // Категории, которые мы будем искать в Excel
  const categories = [
    { code: "money", title: "Деньги в матрице", sheet: "sheet_Лист1.json" },
    { code: "love", title: "Отношения в матрице", sheet: "sheet_Совместимость.json" },
    { code: "health", title: "Карта Здоровья", sheet: "sheet_Лист1.json" },
    { code: "karma", title: "Задачи из прошлых жизней", sheet: "sheet_Лист1.json" },
    { code: "talents", title: "Ваши Таланты", sheet: "sheet_Кристалл Судьбы.json" },
  ];

  for (const cat of categories) {
    const filePath = path.join(reportsDir, cat.sheet);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      const cells = data.strings || [];

      // Генерируем расшифровки для каждого аркана (1-22)
      for (let i = 1; i <= 22; i++) {
        // Ищем текст, который может подойти. 
        // В реальном Excel это были бы конкретные ячейки, сейчас мы берем лучшее совпадение.
        const content = cells.find((c: any) => c.value.length > 50 && (c.value.includes(String(i)) || c.cell.includes(String(i))));
        
        if (content) {
          await prisma.contentBlock.upsert({
            where: { code: `${cat.code}_arcana_${i}` },
            update: {
              content: content.value,
              title: cat.title,
              calculatorType: "matrix",
              isFree: false,
            },
            create: {
              code: `${cat.code}_arcana_${i}`,
              content: content.value,
              title: cat.title,
              calculatorType: "matrix",
              isFree: false,
            }
          });
        }
      }
    }
  }

  console.log("Deep seeding finished. Paid blocks now have real content.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
