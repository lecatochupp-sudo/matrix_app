import { TextAtom, getAtomsForArcana, AtomContext } from "./atomsRepository";
import { ContentSignals } from "./signalEngine";

export function selectAtoms(
    arcana: number, 
    context: AtomContext, 
    signals: ContentSignals
): TextAtom[] {
    const atoms = getAtomsForArcana(arcana, context);

    return atoms.filter(atom => {
        if (!atom.condition) return true;

        // Простая проверка условий (можно расширить до полноценного парсера)
        if (atom.condition === "has_money_karma_clash" && signals.has_money_karma_clash) return true;
        if (atom.condition === "is_power_profile" && signals.is_power_profile) return true;
        if (atom.condition === "is_spiritual_profile" && signals.is_spiritual_profile) return true;
        if (atom.condition === "is_creative_profile" && signals.is_creative_profile) return true;

        return false;
    });
}
