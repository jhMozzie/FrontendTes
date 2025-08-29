import axios from 'axios';

import type { User } from './types';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- Funciones exportadas para el CRUD de Usuarios ---

/**
 * Obtiene todos los usuarios del servidor.
 */
export const getUsers = async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    return response.data;
  };
  
  /**
   * Obtiene un usuario específico por su ID.
   */
  export const getUserById = async (id: number): Promise<User> => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  };
  
  /**
   * Crea un nuevo usuario.
   * Nota: El tipo de dato de entrada incluye la contraseña, pero la respuesta no.
   */
  export const createUser = async (userData: Omit<User, 'id'> & { password: string }): Promise<User> => {
    const response = await apiClient.post('/users', userData);
    return response.data;
  };
  
  /**
   * Actualiza un usuario existente.
   * Se utiliza Partial<> para permitir actualizaciones parciales (ej. solo el username).
   */
  export const updateUser = async (id: number, userData: Partial<Omit<User, 'id'>>): Promise<User> => {
    const response = await apiClient.put(`/users/${id}`, userData);
    return response.data;
  };
  
  /**
   * Elimina un usuario por su ID.
   */
  export const deleteUser = async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}`);
  };