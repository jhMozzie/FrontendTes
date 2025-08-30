// src/modules/students/services.ts

import axios from 'axios';
import type { Student } from './types';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Para la creación, no enviamos el objeto completo, solo los IDs.
type CreateStudentPayload = Omit<Student, 'id' | 'user' | 'academy'>;
type UpdateStudentPayload = Partial<CreateStudentPayload>;

/**
 * Obtiene todos los estudiantes.
 */
export const getStudents = async (): Promise<Student[]> => {
  const response = await apiClient.get('/students');
  return response.data;
};

// --- AÑADE ESTA NUEVA FUNCIÓN ---
/**
 * Obtiene los estudiantes que pertenecen a una academia específica por su ID.
 * Llama a tu API con un parámetro, ej: GET /api/students?academyId=1
 */

export const getStudentsByAcademyId = async (academyId: number): Promise<Student[]> => {
    const response = await apiClient.get('/students', {
      // ESTA PARTE ES CRUCIAL
      params: {
        academyId: academyId,
      },
    });
    return response.data;
  };
  
// ------------------------------------

/**
 * Crea un nuevo estudiante.
 */
export const createStudent = async (studentData: CreateStudentPayload): Promise<Student> => {
  const response = await apiClient.post('/students', studentData);
  return response.data;
};

/**
 * Actualiza un estudiante existente.
 */
export const updateStudent = async (id: number, studentData: UpdateStudentPayload): Promise<Student> => {
  const response = await apiClient.put(`/students/${id}`, studentData);
  return response.data;
};

/**
 * Elimina un estudiante por su ID.
 */
export const deleteStudent = async (id: number): Promise<void> => {
  await apiClient.delete(`/students/${id}`);
};