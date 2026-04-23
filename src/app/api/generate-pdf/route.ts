import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from '@pdf-lib/fontkit';
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { calculateFullMatrix } from "@/domain/calculations/fullMatrixProvider";
import { parseBirthDate } from "@/domain/calculations/parseBirthDate";
import { getAtomsForEnergy, getEnergyMeta } from "@/lib/content/textAtomsRepository";
import { composePsychologicalAnalysis } from "@/lib/content/textComposer";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "Аноним";
  const date = searchParams.get("date");

  if (!date) return NextResponse.json({ error: "Missing date" }, { status: 400 });

  try {
    const { day, month, year } = parseBirthDate(date);
    const matrixData = calculateFullMatrix(day, month, year);

    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    const fontPath = join(process.cwd(), "public", "assets", "fonts", "arial.ttf");
    if (!existsSync(fontPath)) throw new Error(`Font file not found at ${fontPath}`);
    const fontBytes = readFileSync(fontPath);
    const customFont = await pdfDoc.embedFont(fontBytes);
    const customFontBold = await pdfDoc.embedFont(fontBytes);

    const PAGE_WIDTH = 595.28;
    const PAGE_HEIGHT = 841.89;
    const MARGIN = 70;

    let pageNum = 1;

    const createPage = (isDark = false) => {
        const page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        if (isDark) {
            page.drawRectangle({ x: 0, y: 0, width: PAGE_WIDTH, height: PAGE_HEIGHT, color: rgb(0.02, 0.03, 0.08) });
        }
        page.drawRectangle({
            x: 30, y: 30, width: PAGE_WIDTH - 60, height: PAGE_HEIGHT - 60,
            borderColor: isDark ? rgb(1,1,1) : rgb(0.1, 0.1, 0.3), borderWidth: 0.3, opacity: 0.3
        });
        page.drawText(`${pageNum++}`, {
            x: PAGE_WIDTH / 2, y: 45, size: 8, font: customFont, color: isDark ? rgb(1,1,1) : rgb(0.5, 0.5, 0.5)
        });
        return page;
    };

    const drawText = (page: any, text: string, x: number, y: number, size: number, font: any, color: any, maxWidth: number) => {
        const words = text.split(' ');
        let line = '';
        let currentY = y;

        for (const word of words) {
            const testLine = line + word + ' ';
            const testWidth = font.widthOfTextAtSize(testLine.trim(), size);
            if (testWidth > maxWidth) {
                page.drawText(line.trim(), { x, y: currentY, size, font, color });
                line = word + ' ';
                currentY -= size * 1.5;
                if (currentY < 70) return { finished: false, remaining: words.slice(words.indexOf(word)).join(' '), lastY: currentY };
            } else {
                line = testLine;
            }
        }
        page.drawText(line.trim(), { x, y: currentY, size, font, color });
        return { finished: true, lastY: currentY - size * 1.5 };
    };

    // --- COVER ---
    let currentPage = createPage(true);
    currentPage.drawText("MATRIX DESTINY", { x: MARGIN, y: PAGE_HEIGHT - 200, size: 48, font: customFontBold, color: rgb(1, 1, 1) });
    currentPage.drawText("PERSONAL REVELATION", { x: MARGIN, y: PAGE_HEIGHT - 250, size: 16, font: customFont, color: rgb(0.4, 0.5, 1) });
    currentPage.drawText(`ИМЯ: ${name.toUpperCase()}`, { x: MARGIN, y: 220, size: 14, font: customFont, color: rgb(1, 1, 1) });
    currentPage.drawText(`ДАТА: ${date}`, { x: MARGIN, y: 195, size: 14, font: customFont, color: rgb(1, 1, 1) });

    // --- SECTIONS ---
    const contexts = [
        { id: 'personality', title: 'ФУНДАМЕНТ ЛИЧНОСТИ', color: rgb(0.1, 0.1, 0.4) },
        { id: 'talents', title: 'ДАР И ТАЛАНТЫ', color: rgb(0.1, 0.3, 0.1) },
        { id: 'money', title: 'ФИНАНСОВЫЙ КАНАЛ', color: rgb(0.4, 0.3, 0) },
        { id: 'love', title: 'ЛЮБОВЬ И ОТНОШЕНИЯ', color: rgb(0.5, 0, 0) },
        { id: 'mission', title: 'ПРЕДНАЗНАЧЕНИЕ', color: rgb(0.3, 0, 0.4) },
        { id: 'karma', title: 'КАРМИЧЕСКИЕ ЗАДАЧИ', color: rgb(0.2, 0.2, 0.2) }
    ];

    for (const ctx of contexts) {
        let energy = matrixData.diagonal.center;
        if (ctx.id === 'talents') energy = matrixData.diagonal.top;
        if (ctx.id === 'money') energy = matrixData.money.main;
        if (ctx.id === 'love') energy = matrixData.love.main;
        if (ctx.id === 'mission') energy = matrixData.destiny.social;
        if (ctx.id === 'karma') energy = matrixData.diagonal.bottom;

        const content = getAtomsForEnergy(energy, ctx.id as any);
        const meta = getEnergyMeta(energy);
        if (!content) continue;

        const fullText = composePsychologicalAnalysis(content, { energy, energyName: meta?.name || '', theme: meta?.theme || '' }, ctx.id);

        // Section Title Page
        currentPage = createPage();
        let y = PAGE_HEIGHT - 100;
        currentPage.drawText(ctx.title, { x: MARGIN, y, size: 28, font: customFontBold, color: ctx.color });
        y -= 40;
        currentPage.drawText(`Код Энергии: ${energy} — ${meta?.name}`, { x: MARGIN, y, size: 14, font: customFont, color: rgb(0.4, 0.4, 0.4) });
        y -= 60;

        const blocks = fullText.split('\n\n');
        for (const block of blocks) {
            if (y < 100) {
                currentPage = createPage();
                y = PAGE_HEIGHT - MARGIN;
            }

            if (block.startsWith('###')) {
                y -= 10;
                currentPage.drawText(block.replace('### ', '').toUpperCase(), { x: MARGIN, y, size: 12, font: customFontBold, color: ctx.color });
                y -= 25;
            } else {
                let remainingText = block;
                while (remainingText) {
                    const result = drawText(currentPage, remainingText, MARGIN, y, 10, customFont, rgb(0.1, 0.1, 0.1), PAGE_WIDTH - MARGIN * 2);
                    if (result.finished) {
                        y = result.lastY - 15;
                        remainingText = "";
                    } else {
                        currentPage = createPage();
                        y = PAGE_HEIGHT - MARGIN;
                        remainingText = result.remaining || "";
                    }
                }
            }
        }
    }

    const pdfBytes = await pdfDoc.save();
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Matrix-Pro-Analysis-${encodeURIComponent(name)}.pdf"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: "PDF generation failed", details: error.message }, { status: 500 });
  }
}
