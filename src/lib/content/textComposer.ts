import { ContextContent } from "./textAtomsRepository";

interface ComposeOptions {
    energy: number;
    energyName: string;
    theme: string;
}

const INTRO_VARIANTS = [
    "Вы человек, в основе которого проявлена энергия {energyName}. Это глубокая внутренняя настройка на тему: {theme}.",
    "Ваш профиль резонирует с вибрацией {energyName}. В вашей жизни это проявляется как фундаментальный фокус на {theme}.",
    "Анализ вашей матрицы указывает на доминирование энергии {energyName}. Ваша ключевая жизненная задача и сила связаны с темой: {theme}.",
    "Ваша личность неразрывно связана с кодом {energyName}. Это определяет ваш способ взаимодействия с миром через призму {theme}.",
    "Энергия {energyName} — это ваш внутренний фундамент. Темы {theme} являются для вас определяющими на протяжении всего пути."
];

const STRENGTH_TRANSITIONS = [
    "В ресурсном состоянии эта энергия раскрывает ваши лучшие качества:",
    "Когда вы находитесь в балансе, эта энергия становится вашим мощным инструментом:",
    "Ваша истинная сила проявляется через следующие аспекты:",
    "В конструктивном русле этот код дает вам уникальные преимущества:"
];

const SHADOW_TRANSITIONS = [
    "Однако у этой медали есть и обратная сторона. В состоянии дефицита или стресса:",
    "Важно осознавать и «теневые» проявления. Если энергия уходит в минус:",
    "Но будьте внимательны: эта же сила может превратиться в препятствие, если:",
    "Внутренний конфликт часто возникает в точках, где:"
];

const MANIFEST_TRANSITIONS = [
    "В реальной жизни и повседневных ситуациях это выглядит так:",
    "Вы можете замечать эти паттерны в своём поведении ежедневно:",
    "Практическое проявление этой энергии в вашей реальности:",
    "На бытовом и социальном уровнях это транслируется как:"
];

const INSIGHT_TRANSITIONS = [
    "Главный инсайт, который несет в себе эта энергия:",
    "Самое важное, что вам нужно понять про свой внутренний сценарий:",
    "Глубинный смысл вашей настройки заключается в следующем:",
    "Ключевое осознание, которое откроет ваш потенциал:"
];

const ADVICE_TRANSITIONS = [
    "Ваш реальный рост и масштаб начинаются в точке, где вы:",
    "Чтобы перевести эту энергию в устойчивый плюс, начните с того, что:",
    "Ключ к управлению вашим потенциалом скрыт в этих действиях:",
    "Ваша стратегия успеха на ближайшее время:"
];

function getVariant(variants: string[], seed: number): string {
    // Используем сумму цифр энергии для более случайного, но детерминированного выбора
    const index = (seed + seed % 3) % variants.length;
    return variants[index];
}

export function composePsychologicalAnalysis(content: ContextContent, options: ComposeOptions): string {
    const { energy, energyName, theme } = options;
    const seed = energy; 

    let text = "";

    // 1. INTRO
    const introTemplate = getVariant(INTRO_VARIANTS, seed);
    text += introTemplate.replace("{energyName}", energyName).replace("{theme}", theme);
    text += "\n\nЭто не просто характеристика — это то, как вы принимаете решения, как реагируете на события и как строите свою жизнь.\n\n";

    // 2. STRENGTHS
    text += `--- \n\n${getVariant(STRENGTH_TRANSITIONS, seed + 1)}\n`;
    text += content.strengths?.join("\n") || "";
    text += "\n\n";

    // 3. SHADOW
    text += `--- \n\n${getVariant(SHADOW_TRANSITIONS, seed + 2)}\n`;
    text += content.shadow?.join("\n") || "";
    text += "\n\n";

    // 4. MANIFESTATION
    text += `--- \n\n${getVariant(MANIFEST_TRANSITIONS, seed + 3)}\n`;
    text += content.manifestation?.join("\n") || "";
    text += "\n\n";

    // 5. INSIGHT
    text += `--- \n\n${getVariant(INSIGHT_TRANSITIONS, seed + 4)}\n`;
    // Для инсайта используем вводную часть intro из JSON, так как она содержит суть
    text += content.intro?.[0] || ""; 
    text += "\n\n";

    // 6. ADVICE
    text += `--- \n\n${getVariant(ADVICE_TRANSITIONS, seed + 5)}\n`;
    text += content.advice?.join("\n") || "";
    text += "\n\n";

    return text;
}

export function generatePaywallPreview(fullText: string): string {
    const paragraphs = fullText.split("\n\n");
    // Строго 30% контента, но не менее 2 абзацев
    const cutIndex = Math.max(2, Math.floor(paragraphs.length * 0.35));
    
    let preview = paragraphs.slice(0, cutIndex).join("\n\n");
    
    preview += "\n\n...и именно здесь скрывается ключевая точка вашего внутреннего сценария, которая определяет 80% событий в этой сфере.";
    
    return preview;
}

export function generateFullTeaser(content: ContextContent): string {
    const baseTeaser = (content.teaser && content.teaser.length > 0) ? content.teaser[0] : "Ваш персональный код содержит ответы на фундаментальные вопросы.";
    return `${baseTeaser}\n\nПолный разбор раскрывает:\n- ваши скрытые механизмы поведения\n- реальные причины повторяющихся ситуаций\n- точные точки роста по вашей матрице\n- пошаговый план вывода энергии в плюс`;
}
