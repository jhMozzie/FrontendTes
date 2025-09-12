import type { Academy } from "../academies/types";

// Interfaz para un Estudiante
export interface Student {
  id: number;
  firstname: string;
  lastname: string;
}

// Interfaz para un Participante
export interface Participant {
  id: number;
  student: Student;
}

// Interfaz para una Categoría de Campeonato (cuando la recibimos de la API)
export interface ChampionshipCategory {
  id: number;
  code: string | null;
  modality: string;
  ageRange: string;
  ageCategory: string;

  gender: string;
  skillLevel: string;
  participants: Participant[];
}

// Interfaz para el payload de CREACIÓN de una nueva categoría
export interface CreateChampionshipCategoryPayload {
  modality: string;
  ageRange: string;
  ageCategory: string;
  gender: string;
  skillLevel: string;
  // --- CORRECCIÓN AQUÍ: Hacemos el tipo consistente para aceptar null ---
  code?: string | null; // Permite string, null, o undefined
}


// --- NUEVA INTERFAZ ---
// Define los datos necesarios para inscribir un nuevo participante.
export interface CreateParticipantPayload {
  studentId: number;
  championshipCategoryId: number;
}

// Interfaz principal para un Campeonato
export interface Championship {
  id: number;
  name: string;
  startDate: string;
  location: string;
  academyId: number;
  academy?: Academy;
  categories?: ChampionshipCategory[]; 
}
