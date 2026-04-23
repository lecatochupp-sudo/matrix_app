import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fontkit from '@pdf-lib/fontkit';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "Anonymous";
  const date = searchParams.get("date") || "01.01.2000";

  try {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const { width, height } = page.getSize();
    
    // Рисуем заголовок
    page.drawText("Matrix Pro: Personal Revelation", {
      x: 50,
      y: height - 100,
      size: 28,
      color: rgb(0.31, 0.27, 0.9), // Indigo
    });

    page.drawText(`Name: ${name}`, { x: 50, y: height - 160, size: 16 });
    page.drawText(`Birth Date: ${date}`, { x: 50, y: height - 185, size: 16 });

    page.drawRectangle({
        x: 50,
        y: 200,
        width: width - 100,
        height: 400,
        borderColor: rgb(0.9, 0.9, 0.9),
        borderWidth: 1,
    });

    page.drawText("Detailed analysis content...", {
        x: 100,
        y: 550,
        size: 12,
        color: rgb(0.4, 0.4, 0.4)
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Matrix-Report-${name}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}
