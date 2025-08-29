<template>
  <div>
    <!-- Encabezado con Título y Botón de Acción -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Campeonatos</h1>
      <button @click="openCreateModal"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span>Crear Campeonato</span>
      </button>
    </div>

    <!-- Feedback de Carga y Errores -->
    <div v-if="isLoading" class="text-center text-gray-500 dark:text-gray-400">Cargando...</div>
    <div v-else-if="error" class="text-center text-red-500 dark:text-red-400">{{ error }}</div>

    <!-- Tabla de Campeonatos -->
    <div v-else class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">Lista de Campeonatos</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Nombre</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Fecha</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Ubicación
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Acciones
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-if="championships.length === 0">
              <td colspan="4" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No hay campeonatos.</td>
            </tr>
            <tr v-for="champ in championships" :key="champ.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{{ champ.name
                }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{
                formatDate(champ.startDate) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ champ.location }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button @click="openEditModal(champ)"
                  class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Editar">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z">
                    </path>
                  </svg>
                </button>
                <button @click="openDeleteModal(champ)"
                  class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Eliminar">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                    </path>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <ChampionshipFormModal 
  :isOpen="isFormModalVisible" 
  :championshipToEdit="selectedChampionship"
  :academies="academies" 
  @close="closeFormModal" 
  @save="handleSave" />
    <ConfirmDeleteModal :isOpen="isDeleteModalVisible" itemType="campeonato" :itemName="selectedChampionship?.name"
      @close="closeDeleteModal" @confirm="handleDeleteConfirm" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ChampionshipFormModal from '@/modules/championships/components/ChampionshipFormModal.vue';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue';
import { getChampionships, createChampionship, updateChampionship, deleteChampionship } from '../services';
import type { Championship } from '@/modules/championships/types';

// --- 1. IMPORTA el servicio y el tipo de dato de Academias ---
import { getAcademies } from '@/modules/academies/services';
import type { Academy } from '@/modules/academies/types';

// Estado de la página
const isLoading = ref(true);
const error = ref<string | null>(null);
const championships = ref<Championship[]>([]);
const academies = ref<Academy[]>([]); // Esta línea ya la tenías, está perfecta

// Estado para los modales
const isFormModalVisible = ref(false);
const isDeleteModalVisible = ref(false);
const selectedChampionship = ref<Championship | null>(null);

// --- Función para formatear la fecha ---
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// --- 2. MODIFICA la carga de datos para incluir academias ---
const loadData = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    // Usamos Promise.all para cargar campeonatos y academias al mismo tiempo
    const [championshipsData, academiesData] = await Promise.all([
      getChampionships(),
      getAcademies() // <-- Llama a la función para obtener academias
    ]);
    championships.value = championshipsData;
    academies.value = academiesData; // <-- Asigna los datos a la variable
  } catch (err) {
    error.value = 'No se pudieron cargar los datos.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

// --- 3. USA la nueva función de carga al montar el componente ---
onMounted(loadData);


// --- Lógica para el Modal de Formulario (Crear/Editar) ---
const openCreateModal = () => {
  selectedChampionship.value = null;
  isFormModalVisible.value = true;
};

const openEditModal = (champ: Championship) => {
  selectedChampionship.value = { ...champ, startDate: formatDate(champ.startDate) };
  isFormModalVisible.value = true;
};

const closeFormModal = () => {
  isFormModalVisible.value = false;
};

const handleSave = async (formData: Omit<Championship, 'id'>) => {
  try {
    if (selectedChampionship.value) {
      await updateChampionship(selectedChampionship.value.id, formData);
    } else {
      await createChampionship(formData);
    }
    await loadData(); // <-- Refresca todos los datos
  } catch (err) {
    error.value = 'Error al guardar el campeonato.';
    console.error(err);
  } finally {
    closeFormModal();
  }
};


// --- Lógica para el Modal de Eliminación ---
const openDeleteModal = (champ: Championship) => {
  selectedChampionship.value = champ;
  isDeleteModalVisible.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalVisible.value = false;
};

const handleDeleteConfirm = async () => {
  if (!selectedChampionship.value) return;
  try {
    await deleteChampionship(selectedChampionship.value.id);
    await loadData(); // <-- Refresca todos los datos
  } catch (err) {
    error.value = 'Error al eliminar el campeonato.';
    console.error(err);
  } finally {
    closeDeleteModal();
  }
};
</script>