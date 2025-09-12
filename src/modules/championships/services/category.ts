import axios from 'axios';
import type { ChampionshipCategory, CreateChampionshipCategoryPayload } from '../types';

const API_BASE_URL = 'http://localhost:3000/api';
const apiClient = axios.create({ baseURL: API_BASE_URL, headers: { 'Content-Type': 'application/json' } });

/**
 * Obtiene todas las categorías de un campeonato específico.
 */
export const getCategoriesByChampionship = async (championshipId: number): Promise<ChampionshipCategory[]> => {
  const response = await apiClient.get(`/championships/${championshipId}/categories`);
  return response.data;
};

/**
 * Crea una nueva categoría para un campeonato existente.
 */
// CAMBIO: Renombrado de 'addCategoryToChampionship'
export const createChampionshipCategory = async (
  championshipId: number, 
  categoryData: CreateChampionshipCategoryPayload
): Promise<ChampionshipCategory> => {
  const response = await apiClient.post(`/championships/${championshipId}/categories`, categoryData);
  return response.data;
};

/**
 * Actualiza una categoría existente.
 */
export const updateChampionshipCategory = async (
  categoryId: number,
  categoryData: Partial<CreateChampionshipCategoryPayload>
): Promise<ChampionshipCategory> => {
  const response = await apiClient.put(`/championship-categories/${categoryId}`, categoryData);
  return response.data;
};

/**
 * Elimina una categoría específica por su ID.
 */
// CAMBIO: Renombrado de 'removeCategoryFromChampionship'
export const deleteChampionshipCategory = async (categoryId: number): Promise<void> => {
  await apiClient.delete(`/championship-categories/${categoryId}`);
};

