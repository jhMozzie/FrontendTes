<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Nombre</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Fecha</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Ubicación</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-if="championships.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No hay campeonatos para mostrar.</td>
          </tr>
          <tr v-for="champ in championships" :key="champ.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{{ champ.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ new Date(champ.startDate).toLocaleDateString() }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ champ.location }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              
              <!-- CAMBIO CLAVE: Envolvemos los iconos en un contenedor Flexbox -->
              <div class="flex items-center justify-end space-x-2">
                <!-- Botón para Editar (abre el modal) -->
                <button @click="$emit('editChampionship', champ)" class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 p-1" title="Editar">
                  <PencilSquareIcon class="w-5 h-5" />
                </button>
                
                <!-- Botón para Eliminar (abre modal de confirmación) -->
                <button @click="$emit('deleteChampionship', champ)" class="text-red-600 hover:text-red-900 dark:text-red-400 p-1" title="Eliminar">
                  <TrashIcon class="w-5 h-5" />
                </button>

                <!-- El enlace de navegación ahora es una lupa -->
                <router-link
                  :to="{ name: 'ChampionshipDetailParticipants', params: { id: champ.id } }"
                  class="text-green-600 hover:text-green-900 dark:text-green-400 p-1" 
                  title="Gestionar Campeonato"
                >
                  <EyeIcon class="w-5 h-5" />
                </router-link>
              </div>
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Championship } from '../types';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';

defineProps<{
  championships: Championship[];
}>();

defineEmits(['editChampionship', 'deleteChampionship']);
</script>

