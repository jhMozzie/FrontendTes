<template>
    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 class="font-bold text-lg mb-4">Próximos Campeonatos</h3>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Campeonato</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participantes</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="championships.length === 0">
                <td colspan="4" class="px-6 py-4 text-center text-gray-500">No hay campeonatos próximos.</td>
            </tr>
            <tr v-for="champ in championships" :key="champ.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ champ.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ champ.date }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ champ.participants }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Detalles</a>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
   
  interface Championship {
    id: number;
    name: string;
    date: string;
    participants: number;
  }
   
  const { championships } = defineProps<{
    championships: Championship[];
  }>();
  </script>