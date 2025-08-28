// src/types/championship.ts

/**
 * Define la estructura de un objeto Championship.
 * Esta será la única fuente de verdad para este tipo en toda la aplicación.
 */
export interface Championship {
    id: number;
    name: string;
    startDate: string;
    location: string;
  }
  