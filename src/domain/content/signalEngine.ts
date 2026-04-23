export interface ContentSignals {
    has_money_karma_clash: boolean;
    is_power_profile: boolean;
    is_spiritual_profile: boolean;
    is_creative_profile: boolean;
}

export function extractSignals(data: any): ContentSignals {
    const moneyArcana = data.money.main;
    const karmaArcana = data.diagonal.bottom;
    const centralArcana = data.diagonal.center;

    return {
        has_money_karma_clash: moneyArcana === karmaArcana,
        is_power_profile: [4, 7, 11, 15, 19].includes(centralArcana),
        is_spiritual_profile: [2, 5, 9, 20].includes(centralArcana),
        is_creative_profile: [3, 14, 17, 22].includes(centralArcana)
    };
}
