import axios from 'axios';
// PASO 1: Importa la interfaz desde el archivo central de tipos del módulo
import type { Championship } from './types';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// PASO 2: Ya no definimos la interfaz aquí

// --- Funciones exportadas para el CRUD de Campeonatos ---

export const getChampionships = async (): Promise<Championship[]> => {
  const response = await apiClient.get('/championships');
  return response.data;
};

export const createChampionship = async (championshipData: Omit<Championship, 'id'>): Promise<Championship> => {
  const response = await apiClient.post('/championships', championshipData);
  return response.data;
};

export const updateChampionship = async (id: number, championshipData: Partial<Omit<Championship, 'id'>>): Promise<Championship> => {
  const response = await apiClient.put(`/championships/${id}`, championshipData);
  return response.data;
};

export const deleteChampionship = async (id: number): Promise<void> => {
  await apiClient.delete(`/championships/${id}`);
};
