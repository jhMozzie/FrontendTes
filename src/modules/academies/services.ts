import axios from 'axios';
import type { Academy } from './types';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- Funciones exportadas para el CRUD de Academias ---
/**
 * Obtiene todas las academias.
 */
export const getAcademies = async (): Promise<Academy[]> => {
    const response = await apiClient.get('/academies');
    return response.data;
  };
  
  /**
   * Obtiene una academia por su ID.
   */
  export const getAcademyById = async (id: number): Promise<Academy> => {
    const response = await apiClient.get(`/academies/${id}`);
    return response.data;
  };
  
  /**
   * Crea una nueva academia.
   * El tipo Omit<Academy, 'id'> asegura que se envíen 'name' y 'userId'.
   */
  export const createAcademy = async (academyData: Omit<Academy, 'id'>): Promise<Academy> => {
    const response = await apiClient.post('/academies', academyData);
    return response.data;
  };
  
  /**
   * Actualiza una academia existente.
   */
  export const updateAcademy = async (id: number, academyData: Partial<Omit<Academy, 'id'>>): Promise<Academy> => {
    const response = await apiClient.put(`/academies/${id}`, academyData);
    return response.data;
  };
  
  /**
   * Elimina una academia por su ID.
   */
  export const deleteAcademy = async (id: number): Promise<void> => {
    await apiClient.delete(`/academies/${id}`);
  };
  