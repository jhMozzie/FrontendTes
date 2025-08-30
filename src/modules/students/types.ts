// src/modules/students/types.ts

import type { User } from '@/modules/users/types';
import type { Academy } from '@/modules/academies/types';

/**
 * Define la estructura de un objeto Student.
 * Incluye los objetos anidados 'user' y 'academy' que devuelve el API.
 */
export interface Student {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string; // Se maneja como string para la transferencia de datos
  userId: number;
  academyId: number;
  user: User;
  academy: Academy;
}