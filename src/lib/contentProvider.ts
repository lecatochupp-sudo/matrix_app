export interface ArcanaContent {
  personality: string;
  money: string;
  love: string;
  mission: string;
  shadow: string;
  teaser: string;
  title: string;
}

export interface SectionDefinition {
    id: string;
    title: string;
    isFree: boolean;
    icon: string;
    preview?: string;
}

export const REPORT_SECTIONS: SectionDefinition[] = [
    { id: "personality", title: "Личность и потенциал", isFree: true, icon: "User" },
    { id: "talents", title: "Ваши таланты и дары", isFree: true, icon: "Sparkles" },
    { id: "power_point", title: "Точка вашей силы", isFree: false, icon: "Zap" },
    { id: "comfort_point", title: "Точка душевного комфорта", isFree: false, icon: "Home" },
    { id: "money", title: "Финансовый канал и деньги", isFree: false, icon: "DollarSign" },
    { id: "realization", title: "Самореализация и успех", isFree: false, icon: "Briefcase" },
    { id: "love", title: "Любовь и партнерство", isFree: false, icon: "Heart" },
    { id: "karma_tasks", title: "Карма и задачи души", isFree: false, icon: "History" },
    { id: "ancestral", title: "Родовые программы (7 поколений)", isFree: false, icon: "Users" },
    { id: "parent_karma", title: "Детско-родительская карма", isFree: false, icon: "Baby" },
    { id: "spiritual_karma", title: "Духовная карма прошлого", isFree: false, icon: "Moon" },
    { id: "health_chakras", title: "Карта здоровья и чакры", isFree: false, icon: "Activity" },
    { id: "programs", title: "Матричные программы", isFree: false, icon: "Layers" },
    { id: "mission", title: "Предназначение (3 этапа)", isFree: true, icon: "Target" },
    { id: "forecast", title: "Прогноз по годам", isFree: false, icon: "Calendar" },
];

const ARCANA_DATA: Record<number, ArcanaContent> = {
  1: {
    title: "Маг и Первооткрыватель",
    personality: "Ваш профиль показывает редкую способность материализовать идеи из пустоты. Вы — 'чистый импульс'. Ваша главная сила в том, что вы не приспосабливаетесь к реальности, а создаете её под свой волевой запрос.",
    money: "Ваш финансовый максимум скрыт в уникальности. Вы не должны 'работать', вы должны 'вещать' или 'запускать'. Ваш денежный канал открывается через личную инициативу.",
    love: "В отношениях вы ищете соратника. Вы склонны доминировать, поэтому важно учиться диалогу.",
    mission: "Ваша задача — быть проводником новых смыслов. Вы мост между мечтой и реальностью.",
    shadow: "Гордыня, подавление чужой воли, эгоцентризм.",
    teaser: "Узнайте, как ваш Код Мага влияет на финансовый успех и какие блоки мешают вам масштабироваться..."
  },
  2: {
    title: "Интуиция и Гармония",
    personality: "Вы обладаете способностью видеть то, что скрыто от глаз большинства. Ваш профиль указывает на тонкую настройку психики и дар 'примирения противоположностей'.",
    money: "Деньги приходят к вам через информацию и правильные связи. Вам важно быть 'серым кардиналом'.",
    love: "Вам жизненно необходим глубокий эмоциональный резонанс. В паре важно сохранять территорию тайны.",
    mission: "Быть хранителем равновесия и интуитивным проводником.",
    shadow: "Сплетни, двуличность, пассивная агрессия.",
    teaser: "Откройте секрет вашего интуитивного денежного канала и поймите, почему логика иногда вам мешает..."
  },
  // ... more arcana
};

export function getArcanaContent(arcana: number): ArcanaContent {
  return ARCANA_DATA[arcana] || {
    title: `Энергия ${arcana}`,
    personality: `Энергия ${arcana} определяет ваш уникальный путь развития. Это сила, которая требует осознанного управления для достижения гармонии.`,
    money: `Ваш денежный сценарий по ${arcana} аркану связан с умением балансировать между материальным и духовным.`,
    love: `В отношениях ${arcana} аркан дает возможность выстроить глубокую связь через проработку личных границ.`,
    mission: `Ваша задача — трансформировать энергию ${arcana} в созидательную силу для себя и окружающих.`,
    shadow: `Теневое проявление ${arcana} аркана — это ваш скрытый ресурс, который нужно вывести в плюс.`,
    teaser: `🔒 Этот блок содержит ключи к вашему развитию. Разблокируйте полный отчет для детального анализа...`
  };
}

export function getArcanaBrief(arcana: number): string {
    const briefs: Record<number, string> = {
        1: "Маг и Первооткрыватель", 2: "Интуиция и Гармония", 3: "Изобилие и Созидание",
        4: "Власть и Структура", 5: "Знание и Учитель", 6: "Любовь и Выбор",
        7: "Драйв и Победа", 8: "Справедливость и Баланс", 9: "Мудрость и Глубина",
        10: "Поток и Удача", 11: "Сила и Потенциал", 12: "Служение и Видение",
        13: "Трансформация", 14: "Умеренность", 15: "Искушение",
        16: "Пробуждение", 17: "Звезда", 18: "Луна", 19: "Солнце",
        20: "Род", 21: "Мир", 22: "Свобода"
    };
    return briefs[arcana] || "Энергия развития";
}
