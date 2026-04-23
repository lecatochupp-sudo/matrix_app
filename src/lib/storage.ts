"use client";

export interface SavedCalculation {
    id: string;
    name: string;
    date: string;
    gender: string;
    timestamp: number;
}

const STORAGE_KEY = "matrix_calculations_v1";

export const CalculationStorage = {
    save(calc: Omit<SavedCalculation, 'id' | 'timestamp'>) {
        if (typeof window === "undefined") return;
        
        const history = this.getAll();
        const newCalc: SavedCalculation = {
            ...calc,
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now()
        };

        // Избегаем дубликатов по дате и имени
        const isDuplicate = history.some(h => h.name === calc.name && h.date === calc.date);
        if (isDuplicate) return;

        const updated = [newCalc, ...history].slice(0, 10); // Храним последние 10
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    },

    getAll(): SavedCalculation[] {
        if (typeof window === "undefined") return [];
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    clear() {
        if (typeof window === "undefined") return;
        localStorage.removeItem(STORAGE_KEY);
    }
};
