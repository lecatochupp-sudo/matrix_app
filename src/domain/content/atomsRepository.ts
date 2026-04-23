export type AtomContext = 'personality' | 'money' | 'love' | 'mission' | 'karma' | 'health' | 'shadow' | 'advice';
export type AtomType = 'intro' | 'core' | 'signal' | 'warning' | 'conclusion';

export interface TextAtom {
    id: string;
    arcana: number;
    context: AtomContext;
    type: AtomType;
    text: string;
    condition?: string; // Условие для rule-engine
}

export const TEXT_ATOMS: TextAtom[] = [
    // --- ENERGY 1 (The Magician) ---
    {
        id: "arc1_pers_intro", arcana: 1, context: 'personality', type: 'intro',
        text: "Ваша матрица открывается энергией Первооткрывателя и Мага. Это редкий показатель 'чистого импульса', когда мысль способна мгновенно переходить в действие."
    },
    {
        id: "arc1_pers_core", arcana: 1, context: 'personality', type: 'core',
        text: "Вы обладаете врожденной способностью изменять реальность под свой волевой запрос. Для вас не существует закрытых дверей, если внутри сформировано четкое намерение."
    },
    {
        id: "arc1_shadow", arcana: 1, context: 'shadow', type: 'core',
        text: "В теневом проявлении вы можете сталкиваться с 'вулканическим' гневом или, наоборот, полным бессилием, когда огромный потенциал не находит выхода в рутине."
    },
    {
        id: "arc1_money_core", arcana: 1, context: 'money', type: 'core',
        text: "Ваш финансовый поток напрямую зависит от вашей уникальности. Любая попытка работать 'как все' или копировать чужие модели мгновенно блокирует ваш доход."
    },
    {
        id: "arc1_advice", arcana: 1, context: 'advice', type: 'conclusion',
        text: "Начните доверять своим самым безумным идеям — именно в них скрыт ваш следующий финансовый прорыв."
    },

    // --- ENERGY 4 (The Emperor) ---
    {
        id: "arc4_pers_intro", arcana: 4, context: 'personality', type: 'intro',
        text: "В вашем профиле доминирует энергия Структуры и Власти. Вы — природный фундамент, на котором строятся империи, будь то крупный бизнес или крепкая семья."
    },
    {
        id: "arc4_pers_core", arcana: 4, context: 'personality', type: 'core',
        text: "Ваш интеллект работает как совершенная машина планирования. Вы видите порядок там, где другие видят хаос, и способны нести ответственность за масштабные процессы."
    },
    {
        id: "arc4_shadow", arcana: 4, context: 'shadow', type: 'core',
        text: "Главный внутренний конфликт — страх потери контроля. Это может превращать вашу естественную силу в деспотизм или эмоциональную глухоту."
    },
    {
        id: "arc4_money_core", arcana: 4, context: 'money', type: 'core',
        text: "Деньги для вас — это инструмент влияния. Ваш доход растет вместе с уровнем иерархии, которую вы занимаете или создаете сами."
    },

    // --- SIGNAL ATOMS (Cross-cutting) ---
    {
        id: "sig_money_karma_conflict", arcana: 0, context: 'money', type: 'signal',
        text: "Внимание: ваша денежная линия пересекается с кармическим узлом. Это означает, что старые долги (в том числе родовые) могут тормозить ваш текущий рост.",
        condition: "has_money_karma_clash"
    }
];

export function getAtomsForArcana(arcana: number, context: AtomContext): TextAtom[] {
    return TEXT_ATOMS.filter(a => (a.arcana === arcana || a.arcana === 0) && a.context === context);
}
