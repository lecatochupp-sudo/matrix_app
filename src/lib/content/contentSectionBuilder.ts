import { getAtomsForEnergy, getEnergyMeta } from "./textAtomsRepository";
import { composePsychologicalAnalysis, generatePaywallPreview, generateFullTeaser } from "./textComposer";

export interface FinalSection {
  id: string;
  title: string;
  fullText: string;
  previewText: string;
  teaser: string;
  isLocked: boolean;
  energy: number;
  energyName: string;
  energyTheme: string;
}

const SECTION_CONFIG = [
  { id: 'personality', title: 'Фундамент личности', context: 'personality', free: true },
  { id: 'talents', title: 'Дар и Таланты', context: 'talents', free: true },
  { id: 'money', title: 'Финансовый потенциал', context: 'money', free: false },
  { id: 'love', title: 'Любовь и Партнерство', context: 'love', free: false },
  { id: 'mission', title: 'Предназначение Души', context: 'mission', free: false },
  { id: 'karma', title: 'Кармический узел', context: 'karma', free: false },
  { id: 'health', title: 'Энергетика и Здоровье', context: 'health', free: false },
  { id: 'forecast', title: 'Прогноз и тренды года', context: 'forecast', free: false },
];

export function buildAllSections(data: any, isPaid: boolean): FinalSection[] {
  return SECTION_CONFIG.map(config => {
    let energy = data.diagonal.left;
    if (config.id === 'talents') energy = data.diagonal.top;
    if (config.id === 'money') energy = data.money.main;
    if (config.id === 'love') energy = data.love.main;
    if (config.id === 'mission') energy = data.destiny.social;
    if (config.id === 'karma') energy = data.diagonal.bottom;
    if (config.id === 'health') energy = data.health.chakra4 || data.diagonal.center;
    if (config.id === 'forecast') energy = data.diagonal.right;

    const content = getAtomsForEnergy(energy, config.context);
    const meta = getEnergyMeta(energy);
    
    const energyName = meta?.name || `Энергия ${energy}`;
    const energyTheme = meta?.theme || "внутренняя эволюция";

    if (!content) {
      return {
        id: config.id, title: config.title, energy, energyName, energyTheme,
        fullText: "Анализ этого сектора требует дополнительных данных. Пожалуйста, обратитесь к полной версии.",
        previewText: "Идет глубокая обработка вашего кода...",
        teaser: "Разблокируйте полный доступ для активации этого раздела",
        isLocked: !isPaid && !config.free
      };
    }

    const options = { energy, energyName, theme: energyTheme };
    const fullText = composePsychologicalAnalysis(content, options);

    return {
      id: config.id,
      title: config.title,
      fullText: fullText,
      previewText: generatePaywallPreview(fullText),
      teaser: generateFullTeaser(content),
      isLocked: !isPaid && !config.free,
      energy,
      energyName,
      energyTheme
    };
  });
}
