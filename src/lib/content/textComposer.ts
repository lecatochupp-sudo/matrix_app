import { ContextContent } from "./textAtomsRepository";

export function composeFullText(content: ContextContent): string {
  const parts = [
    ...(content.intro || []),
    ...(content.strengths || []),
    ...(content.shadow || []),
    ...(content.manifestation || []),
    ...(content.advice || [])
  ];
  return parts.join("\n\n");
}

export function generatePreview(text: string, percentage: number = 0.3): string {
  const paragraphs = text.split("\n\n");
  const count = Math.max(1, Math.floor(paragraphs.length * percentage));
  return paragraphs.slice(0, count).join("\n\n");
}

export function getTeaser(content: ContextContent): string {
  return (content.teaser && content.teaser.length > 0) ? content.teaser[0] : "";
}
