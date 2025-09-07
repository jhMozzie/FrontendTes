import type { Academy } from "../academies/types";

// Interfaz para un Estudiante (la información mínima que necesitamos del participante)
export interface Student {
  id: number;
  firstname: string;
  lastname: string;
}

// Interfaz para un Participante, que contiene la información del Estudiante
export interface Participant {
  id: number;
  student: Student;
}

// Interfaz para una Categoría de Campeonato (cuando la recibimos de la API)
export interface ChampionshipCategory {
  id: number;
  code: string;
  modality: string;
  ageRange: string;
  ageCategory: string; // <-- Campo añadido para consistencia
  gender: string;
  skillLevel: string;
  participants: Participant[];
}

// Interfaz para el payload de CREACIÓN de una nueva categoría
export interface CreateChampionshipCategoryPayload {
  modality: 'KATA' | 'KUMITE';
  ageRange: string;
  ageCategory: string;
  gender: 'FEMENINO' | 'MASCULINO' | 'MIXTO';
  skillLevel: string;
  code: string; // <-- Campo añadido para que el admin pueda definir el código
}

// Interfaz principal para un Campeonato (CORREGIDA)
export interface Championship {
  id: number;
  name: string;
  startDate: string;
  location: string;
  academyId: number;
  academy?: Academy;
  // CORRECCIÓN: Usamos el tipo correcto 'ChampionshipCategory'
  categories?: ChampionshipCategory[]; 
}

