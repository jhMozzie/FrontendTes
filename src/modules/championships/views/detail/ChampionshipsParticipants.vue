<template>
    <div>
      <!-- Encabezado de la Sección -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Gestión de Llaves</h1>
      </div>
  
      <!-- Manejo de estados de carga y error -->
      <div v-if="isLoading" class="text-center text-gray-500 dark:text-gray-400 mt-10">
        Cargando datos del campeonato...
      </div>
      <div v-else-if="error" class="text-center text-red-500 dark:text-red-400 mt-10">
        {{ error }}
      </div>
  
      <!-- Contenido principal de la gestión de llaves -->
      <div v-else class="space-y-6">
        <!-- Selector de Categoría -->
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <label for="category-select" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione una Categoría para trabajar</label>
          <select 
            id="category-select" 
            v-model="selectedCategoryId"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            <option :value="null" disabled>-- Elija una categoría --</option>
            <option v-for="category in championship?.categories" :key="category.id" :value="category.id">
              {{ `${category.modality} - ${category.ageRange} ${category.gender} (${category.skillLevel})` }}
            </option>
          </select>
        </div>
  
        <!-- Sección para la categoría seleccionada -->
        <div v-if="selectedCategory" class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">{{ selectedCategory.modality }} - {{ selectedCategory.ageCategory }}</h2>
              <p class="text-gray-500 dark:text-gray-400">{{ selectedCategory.participants.length }} participantes inscritos</p>
            </div>
            <button 
              :disabled="selectedCategory.participants.length < 2"
              class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1"></path></svg>
              <span>Generar Llaves</span>
            </button>
          </div>
          
          <!-- Aquí se visualizarían las llaves generadas -->
          <div class="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
            <p class="text-center text-gray-500 dark:text-gray-400">
              El visualizador de llaves para esta categoría aparecerá aquí.
            </p>
            
  
  [Image of a tournament bracket]
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { getChampionshipById } from '../../services';
  import type { Championship, ChampionshipCategory } from '../../types';
  
  const route = useRoute();
  const championshipId = Number(route.params.id);
  
  const championship = ref<Championship | null>(null);
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  const selectedCategoryId = ref<number | null>(null);
  
  // Propiedad computada para encontrar la categoría completa basada en el ID seleccionado
  const selectedCategory = computed<ChampionshipCategory | undefined>(() => {
    if (!championship.value || !selectedCategoryId.value) {
      return undefined;
    }
    return championship.value.categories?.find(cat => cat.id === selectedCategoryId.value);
  });
  
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
  </script>
  
  