<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Campeonatos</h1>
      <!-- PASO 1: Conectamos el botón a la función que abre el modal -->
      <button 
        @click="openCreateModal"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        <span>Crear Campeonato</span>
      </button>
    </div>

    <div v-if="isLoading" class="text-center text-gray-500 dark:text-gray-400 mt-10">
      Cargando...
    </div>
    <div v-else-if="error" class="text-center text-red-500 dark:text-red-400 mt-10">
      {{ error }}
    </div>

    <ChampionshipsTable 
      v-else 
      :championships="championships"
      @editChampionship="openEditModal"
      @deleteChampionship="openDeleteModal"
    />

    <!-- PASO 2: Incluimos el modal en la vista -->
    <ChampionshipsFormModal 
      :is-open="isFormModalVisible"
      :championship-to-edit="championshipToEdit"
      :academies="academies"
      @close="closeFormModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// PASO 3: Importamos todo lo necesario
import { getChampionships, createChampionship, updateChampionship } from '../services/index'; // Tu servicio de campeonatos
import { getAcademies } from '@/modules/academies/services'; // Servicio de academias para el dropdown
import type { Championship } from '../types';
import type { Academy } from '@/modules/academies/types';
import ChampionshipsTable from '../components/ChampionshipsTable.vue';
import ChampionshipsFormModal from '../components/ChampionshipsFormModal.vue';

// Estado para la lista de campeonatos
const championships = ref<Championship[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// PASO 4: Creamos el estado para gestionar el modal y sus datos
const academies = ref<Academy[]>([]);
const isFormModalVisible = ref(false);
const championshipToEdit = ref<Championship | null>(null);

const loadData = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const [champsData, academiesData] = await Promise.all([
      getChampionships(),
      getAcademies(),
    ]);
    championships.value = champsData;
    academies.value = academiesData;
  } catch (err) {
    error.value = 'Error al cargar los datos. Por favor, intente de nuevo.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadData);

// PASO 5: Creamos las funciones para manejar el modal
const openCreateModal = () => {
  championshipToEdit.value = null;
  isFormModalVisible.value = true;
};

const openEditModal = (championship: Championship) => {
  championshipToEdit.value = { ...championship };
  isFormModalVisible.value = true;
};

const closeFormModal = () => {
  isFormModalVisible.value = false;
};

const handleSave = async (formData: any) => {
  try {
    if (championshipToEdit.value) {
      await updateChampionship(championshipToEdit.value.id, formData);
    } else {
      // Aquí se usa la función de tu servicio
      await createChampionship(formData);
    }
    await loadData(); // Recargamos la lista
  } catch (err) {
    console.error('Error al guardar el campeonato:', err);
  } finally {
    closeFormModal();
  }
};

const openDeleteModal = (championship: Championship) => {
  console.log('Abrir modal de borrado para:', championship);
};
</script>

