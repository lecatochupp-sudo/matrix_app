import { TextAtom } from "./atomsRepository";

export function composeText(atoms: TextAtom[]): string {
    const order = ['intro', 'core', 'signal', 'warning', 'conclusion'];
    
    const sortedAtoms = [...atoms].sort((a, b) => {
        return order.indexOf(a.type) - order.indexOf(b.type);
    });

    return sortedAtoms.map(a => a.text).join("\n\n");
}

export function generatePreview(text: string, length: number = 150): string {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + "...";
}
