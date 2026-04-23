import { getAtomsForEnergy, getEnergyMeta } from "./textAtomsRepository";
import { composeFullText, generatePreview, getTeaser } from "./textComposer";

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
  { id: 'personality', title: 'Личность', context: 'personality', free: true },
  { id: 'talents', title: 'Таланты', context: 'talents', free: true },
  { id: 'money', title: 'Деньги и Финансы', context: 'money', free: false },
  { id: 'love', title: 'Любовь и Отношения', context: 'love', free: false },
  { id: 'mission', title: 'Предназначение', context: 'mission', free: false },
  { id: 'karma', title: 'Карма и задачи', context: 'karma', free: false },
  { id: 'health', title: 'Здоровье и чакры', context: 'health', free: false },
  { id: 'forecast', title: 'Прогноз на год', context: 'forecast', free: false },
];

export function buildAllSections(data: any, isPaid: boolean): FinalSection[] {
  return SECTION_CONFIG.map(config => {
    // Mapping Matrix Data -> Energy for each section
    let energy = data.diagonal.left; // Default
    if (config.id === 'talents') energy = data.diagonal.top;
    if (config.id === 'money') energy = data.money.main;
    if (config.id === 'love') energy = data.love.main;
    if (config.id === 'mission') energy = data.destiny.social;
    if (config.id === 'karma') energy = data.diagonal.bottom;
    if (config.id === 'health') energy = data.health.chakra4 || data.diagonal.center;
    if (config.id === 'forecast') energy = data.diagonal.right;

    const content = getAtomsForEnergy(energy, config.context);
    const meta = getEnergyMeta(energy);
    
    if (!content) {
      return {
        id: config.id,
        title: config.title,
        fullText: "Анализ данных для этого сектора в процессе...",
        previewText: "Анализ данных в процессе...",
        teaser: "Узнайте больше в полном отчете",
        isLocked: !isPaid && !config.free,
        energy,
        energyName: "Энергия " + energy,
        energyTheme: ""
      };
    }

    const fullText = composeFullText(content);

    return {
      id: config.id,
      title: config.title,
      fullText: fullText,
      previewText: generatePreview(fullText),
      teaser: getTeaser(content),
      isLocked: !isPaid && !config.free,
      energy,
      energyName: meta?.name || "Энергия " + energy,
      energyTheme: meta?.theme || ""
    };
  });
}
