import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from '@pdf-lib/fontkit';
import { readFileSync } from "fs";
import { join } from "path";
import { calculateFullMatrix } from "@/domain/calculations/fullMatrixProvider";
import { parseBirthDate } from "@/domain/calculations/parseBirthDate";
import { buildAllSections } from "@/lib/content/contentSectionBuilder";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "Аноним";
  const date = searchParams.get("date");
  const gender = searchParams.get("gender") || "female";

  if (!date) return NextResponse.json({ error: "Missing date" }, { status: 400 });

  try {
    const { day, month, year } = parseBirthDate(date);
    const matrixData = calculateFullMatrix(day, month, year);
    const sections = buildAllSections(matrixData, true); // true = full content

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    // Загружаем шрифт с кириллицей
    const fontPath = join(process.cwd(), "public/assets/fonts/arial.ttf");
    const fontBytes = readFileSync(fontPath);
    const customFont = await pdfDoc.embedFont(fontBytes);
    const boldFontBytes = readFileSync(join(process.cwd(), "public/assets/fonts/arial.ttf")); // В идеале нужен Arial-Bold
    const customFontBold = await pdfDoc.embedFont(boldFontBytes);

    let page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    let y = height - 80;

    // Обложка
    page.drawRectangle({
        x: 0, y: 0, width, height,
        color: rgb(0.03, 0.04, 0.08) // Dark background like the app
    });

    page.drawText("MATRIX DESTINY PRO", {
      x: 50, y: height - 150, size: 40, font: customFontBold, color: rgb(1, 1, 1)
    });

    page.drawText("ПЕРСОНАЛЬНЫЙ КОД СУДЬБЫ", {
      x: 50, y: height - 200, size: 24, font: customFont, color: rgb(0.4, 0.4, 1)
    });

    page.drawText(`Имя: ${name}`, { x: 50, y: height - 300, size: 18, font: customFont, color: rgb(1, 1, 1) });
    page.drawText(`Дата рождения: ${date}`, { x: 50, y: height - 330, size: 18, font: customFont, color: rgb(1, 1, 1) });

    // Проходим по секциям
    for (const section of sections) {
        page = pdfDoc.addPage([595.28, 841.89]);
        y = height - 50;

        // Заголовок секции
        page.drawText(section.title.toUpperCase(), {
            x: 50, y, size: 18, font: customFontBold, color: rgb(0.3, 0.3, 0.9)
        });
        y -= 30;

        page.drawText(`${section.energyName} (Энергия ${section.energy})`, {
            x: 50, y, size: 14, font: customFont, color: rgb(0.6, 0.6, 0.6)
        });
        y -= 40;

        // Контент (простая разбивка по строкам)
        const lines = section.fullText.split('\n');
        for (const line of lines) {
            if (y < 50) {
                page = pdfDoc.addPage([595.28, 841.89]);
                y = height - 50;
            }
            
            // Очень простая обрезка по ширине для примера (в реале нужен word-wrap)
            const text = line.trim();
            if (text) {
                page.drawText(text.substring(0, 85), {
                    x: 50, y, size: 10, font: customFont, color: rgb(0.2, 0.2, 0.2) // Черный текст на белом фоне страниц контента
                });
                y -= 15;
            } else {
                y -= 10;
            }
        }
    }

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Matrix-Report-${name}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Error:", error);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
