<template>
  <div>
    <!-- Encabezado con Título y Botón de Crear -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Categorías del Campeonato</h1>
      <button 
        @click="openCreateModal"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        <span>Crear Categoría</span>
      </button>
    </div>

    <!-- Manejo de estados de carga y error -->
    <div v-if="isLoading" class="text-center text-gray-500 dark:text-gray-400 mt-10">
      Cargando...
    </div>
    <div v-else-if="error" class="text-center text-red-500 dark:text-red-400 mt-10">
      {{ error }}
    </div>

    <!-- Tabla de Categorías (con el estilo oscuro) -->
    <div v-else class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Código</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descripción</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-if="!championship?.categories || championship.categories.length === 0">
              <td colspan="3" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No hay categorías creadas.</td>
            </tr>
            <tr v-for="category in championship?.categories" :key="category.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{{ category.code || `C-${category.id}` }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ `${category.modality} - ${category.ageRange} ${category.gender} (${category.skillLevel})` }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button @click="openEditModal(category)" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 p-1" title="Editar">
                    <PencilSquareIcon class="w-5 h-5" />
                  </button>
                  <button @click="openDeleteModal(category)" class="text-red-600 hover:text-red-900 dark:text-red-400 p-1" title="Eliminar">
                    <TrashIcon class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- El modal para crear y editar categorías -->
    <ChampionshipCategoryFormModal
      :is-open="isModalOpen"
      :category-to-edit="categoryToEdit"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getChampionshipById, createChampionshipCategory, updateChampionshipCategory, deleteChampionshipCategory } from '../../services';
import type { Championship, ChampionshipCategory } from '../../types';
import ChampionshipCategoryFormModal from '../../components/ChampionshipsCategoryFormModal.vue';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';

const route = useRoute();
const championshipId = Number(route.params.id);

const championship = ref<Championship | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
const isModalOpen = ref(false);
const categoryToEdit = ref<ChampionshipCategory | null>(null);

const loadChampionshipDetails = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    championship.value = await getChampionshipById(championshipId);
  } catch (err) {
    error.value = 'No se pudieron cargar los detalles del campeonato.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadChampionshipDetails);

const openCreateModal = () => {
  categoryToEdit.value = null;
  isModalOpen.value = true;
};

const openEditModal = (category: ChampionshipCategory) => {
  categoryToEdit.value = { ...category };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleSave = async (formData: Omit<ChampionshipCategory, 'id' | 'participants'>) => {
  try {
    if (categoryToEdit.value) {
      await updateChampionshipCategory(categoryToEdit.value.id, formData);
    } else {
      await createChampionshipCategory(championshipId, formData);
    }
    await loadChampionshipDetails();
  } catch (err) {
    console.error('Error al guardar la categoría:', err);
  } finally {
    closeModal();
  }
};

const openDeleteModal = async (category: ChampionshipCategory) => {
  if (confirm(`¿Estás seguro de que quieres eliminar la categoría?`)) {
    try {
      await deleteChampionshipCategory(category.id);
      await loadChampionshipDetails();
    } catch (err) {
      console.error('Error al eliminar la categoría:', err);
    }
  }
};
</script>

<style scoped>
/* Eliminamos las clases con @apply para evitar errores */
/* Todo el styling está ahora directamente en el template */
</style>