import fs from 'fs';
import path from 'path';

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

let libraryCache: TextAtomsLibrary | null = null;

export function loadTextAtoms(): TextAtomsLibrary {
  if (libraryCache) return libraryCache;

  const filePath = path.join(process.cwd(), 'text_atoms_full_22_energies.json');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  libraryCache = JSON.parse(fileContent);
  return libraryCache!;
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
