<template>
  <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md animate-fade-in">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Categorías del Campeonato</h2>
    </div>

    <!-- Muestra un mensaje mientras se cargan los datos -->
    <div v-if="isLoading" class="text-center py-12 text-gray-500">
      Cargando categorías...
    </div>

    <!-- Muestra un mensaje de error si la carga falla -->
    <div v-else-if="error" class="text-center py-12 text-red-500">
      {{ error }}
    </div>
    
    <!-- Muestra un mensaje si no hay categorías para este campeonato -->
    <div v-else-if="categories.length === 0" class="text-center py-12 text-gray-500">
      Aún no hay categorías creadas para este campeonato.
    </div>

    <!-- Tabla que muestra las categorías -->
    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Código</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Descripción</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nº de Participantes</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 font-mono bg-gray-50 dark:bg-gray-700 rounded">{{ category.code }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 font-medium">{{ category.modality }} - {{ category.ageRange }} {{ category.gender }} ({{ category.skillLevel }})</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 text-center">{{ category.participants.length }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getCategoriesByChampionship } from '@/modules/championships/services/category';
import type { ChampionshipCategory } from '@/modules/championships/types';

const route = useRoute();
const isLoading = ref(true);
const error = ref<string | null>(null);
const categories = ref<ChampionshipCategory[]>([]);
const championshipId = Number(route.params.id);

const loadCategories = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    if (isNaN(championshipId)) throw new Error("ID de campeonato inválido.");
    categories.value = await getCategoriesByChampionship(championshipId);
  } catch (err) {
    error.value = "No se pudieron cargar las categorías.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadCategories);
</script>

<style scoped>
.animate-fade-in { 
  animation: fadeIn 0.5s ease-in-out; 
}

@keyframes fadeIn { 
  from { 
    opacity: 0; 
    transform: translateY(-10px); 
  } 
  to { 
    opacity: 1; 
    transform: translateY(0); 
  } 
}
</style>