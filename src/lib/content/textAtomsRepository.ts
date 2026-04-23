import atomsData from "../../../text_atoms_full_22_energies.json";

export interface ContextContent {
  intro: string[];
  strengths: string[];
  shadow: string[];
  manifestation: string[];
  advice: string[];
  teaser: string[];
}

export interface EnergyContent {
  name: string;
  theme: string;
  contexts: Record<string, ContextContent>;
}

export interface TextAtomsLibrary {
  energies: Record<string, EnergyContent>;
}

// Прямой импорт JSON работает и на клиенте, и на сервере в Next.js
const libraryCache: TextAtomsLibrary = atomsData as any;

export function loadTextAtoms(): TextAtomsLibrary {
  return libraryCache;
}

export function getAtomsForEnergy(energy: number, context: string): ContextContent | null {
  const lib = loadTextAtoms();
  const energyData = lib.energies[energy.toString()];
  if (!energyData) return null;
  return energyData.contexts[context] || null;
}

export function getEnergyMeta(energy: number) {
    const lib = loadTextAtoms();
    const data = lib.energies[energy.toString()];
    return data ? { name: data.name, theme: data.theme } : null;
}
