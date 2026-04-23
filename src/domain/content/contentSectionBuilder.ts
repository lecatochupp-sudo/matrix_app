import { extractSignals } from "./signalEngine";
import { selectAtoms } from "./contentRuleEngine";
import { composeText, generatePreview } from "./textComposer";
import { getArcanaContent, REPORT_SECTIONS } from "@/lib/contentProvider"; // Используем REPORT_SECTIONS как схему

export interface ContentSection {
    sectionCode: string;
    title: string;
    previewText: string;
    fullText: string;
    teaser: string;
    isLocked: boolean;
}

export function buildResultSections(data: any, isPaid: boolean): ContentSection[] {
    const signals = extractSignals(data);
    
    return REPORT_SECTIONS.map(section => {
        // Определяем аркан для контекста
        let arcana = data.diagonal.left;
        let context: any = 'personality';

        if (section.id === 'money') {
            arcana = data.money.main;
            context = 'money';
        } else if (section.id === 'love') {
            arcana = data.love.main;
            context = 'love';
        } else if (section.id === 'mission') {
            arcana = data.destiny.social;
            context = 'mission';
        }

        const atoms = selectAtoms(arcana, context, signals);
        const fullText = composeText(atoms);
        const arcanaBase = getArcanaContent(arcana);

        const isLocked = !isPaid && !section.isFree;

        return {
            sectionCode: section.id,
            title: section.title,
            previewText: generatePreview(fullText),
            fullText: fullText,
            teaser: arcanaBase.teaser,
            isLocked: isLocked
        };
    });
}
