// src/modules/academies/types.ts

/**
 * Define la estructura de un objeto Academy.
 * El userId es obligatorio para saber qué usuario administra la academia.
 */
export interface Academy {
    id: number;
    name: string;
    userId: number; // Campo obligatorio según tu API
}