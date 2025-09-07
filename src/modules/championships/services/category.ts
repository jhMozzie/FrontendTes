import axios from 'axios';
// Importa los tipos necesarios desde el archivo central del módulo
import type { ChampionshipCategory, CreateChampionshipCategoryPayload } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// --- Funciones exportadas para el CRUD de Categorías de un Campeonato ---

/**
 * Obtiene todas las categorías de un campeonato específico.
 * Llama a la ruta: GET /championships/:championshipId/categories
 * @param championshipId El ID del campeonato.
 */
export const getCategoriesByChampionship = async (championshipId: number): Promise<ChampionshipCategory[]> => {
  const response = await apiClient.get(`/championships/${championshipId}/categories`);
  return response.data;
};

/**
 * Añade una nueva categoría a un campeonato existente.
 * Llama a la ruta: POST /championships/:championshipId/categories
 * @param championshipId El ID del campeonato.
 * @param categoryData Los datos de la nueva categoría.
 */
export const addCategoryToChampionship = async (
  championshipId: number, 
  categoryData: CreateChampionshipCategoryPayload
): Promise<ChampionshipCategory> => {
  const response = await apiClient.post(`/championships/${championshipId}/categories`, categoryData);
  return response.data;
};

/**
 * Elimina una categoría específica de un campeonato.
 * Llama a la ruta: DELETE /championship-categories/:categoryId
 * @param categoryId El ID de la categoría a eliminar.
 */
export const removeCategoryFromChampionship = async (categoryId: number): Promise<void> => {
  await apiClient.delete(`/championship-categories/${categoryId}`);
};

