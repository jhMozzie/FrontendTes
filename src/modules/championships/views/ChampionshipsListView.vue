<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Campeonatos</h1>
      <!-- Este botón ahora abrirá un modal (lógica futura) -->
      <button 
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        <span>Crear Campeonato</span>
      </button>
    </div>

    <!-- Manejo de estados de carga y error -->
    <div v-if="isLoading" class="text-center text-gray-500 dark:text-gray-400 mt-10">
      Cargando campeonatos...
    </div>
    <div v-else-if="error" class="text-center text-red-500 dark:text-red-400 mt-10">
      {{ error }}
    </div>

    <!-- La tabla solo se muestra si hay datos y no hay error -->
    <ChampionshipsTable v-else :championships="championships" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getChampionships } from '../services';
import type { Championship } from '../types';
import ChampionshipsTable from '../components/ChampionshipsTable.vue';

// --- LÓGICA PARA BUSCAR DATOS ---
const championships = ref<Championship[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const loadChampionships = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    championships.value = await getChampionships();
  } catch (err) {
    error.value = 'Error al cargar los campeonatos. Por favor, intente de nuevo.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

// Se ejecuta automáticamente cuando el componente se monta en la página
onMounted(loadChampionships);
</script>

