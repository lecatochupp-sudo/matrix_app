import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generateMatrixPDF(data: any) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  page.drawText(`Matrix of Destiny: ${data.name}`, {
    x: 50,
    y: 800,
    size: 24,
    font,
    color: rgb(0.2, 0.2, 0.8),
  });

  page.drawText(`Birth Date: ${data.date}`, {
    x: 50,
    y: 760,
    size: 16,
  });

  page.drawText(`Personal Destiny: ${data.personalDestiny}`, {
    x: 50,
    y: 720,
    size: 14,
  });

  // TODO: Добавить все текстовые блоки расшифровки
  page.drawText("Detailed analysis content goes here...", {
    x: 50,
    y: 680,
    size: 12,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
