import axios from 'axios';
// Importamos los tipos necesarios desde el archivo central del módulo
import type { Participant, CreateParticipantPayload } from '../types';

// Usamos la variable de entorno para la URL del backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Funciones para el CRUD de Participantes ---

/**
 * Inscribe un nuevo participante en una categoría de campeonato.
 * Llama a la ruta del backend: POST /participants
 * @param data Un objeto con { studentId, championshipCategoryId }
 */
export const createParticipant = async (data: CreateParticipantPayload): Promise<Participant> => {
  const response = await apiClient.post('/participants', data);
  return response.data;
};

/**
 * Elimina la inscripción de un participante por su ID.
 * Llama a la ruta del backend: DELETE /participants/:participantId
 * @param participantId El ID de la inscripción a eliminar.
 */
export const deleteParticipant = async (participantId: number): Promise<void> => {
  await apiClient.delete(`/participants/${participantId}`);
};

/**
 * Obtiene una lista de TODOS los participantes de la base de datos.
 * Llama a la ruta del backend: GET /participants
 * NOTA: Esta función podría ser útil en el futuro para una vista de administrador global,
 * pero no se usa en la vista de detalle del campeonato.
 */
export const getAllParticipants = async (): Promise<Participant[]> => {
    const response = await apiClient.get('/participants');
    return response.data;
};

/*
  NOTA IMPORTANTE sobre "Listar Participantes de un Campeonato":
  
  No necesitamos una función como `getParticipantsByChampionship()` aquí.
  
  La forma más eficiente de obtener los participantes de un campeonato específico
  es a través de la función `getChampionshipById()` que ya tienes en tu servicio 
  `championship.ts`. 
  
  Esa función devuelve el objeto completo del campeonato, que ya incluye la lista
  de categorías y, dentro de cada una, la lista de sus participantes. 
  Esto nos ahorra hacer una llamada extra a la API.
*/

