<template>
  <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Nombre</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Apellido</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <!-- Lógica interna: Muestra un mensaje si la lista que recibe está vacía -->
          <tr v-if="!participants || participants.length === 0">
            <td colspan="3" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No hay participantes inscritos en esta categoría.</td>
          </tr>
          <!-- O muestra la lista de participantes -->
          <tr v-else v-for="participant in participants" :key="participant.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{{ participant.student?.firstname || 'N/A' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ participant.student?.lastname || 'N/A' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center justify-end">
                <!-- Emite un evento 'deleteParticipant' cuando se hace clic -->
                <button @click="$emit('deleteParticipant', participant)" class="text-red-600 hover:text-red-900 dark:text-red-400 p-1" title="Eliminar Inscripción">
                  <TrashIcon class="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Participant } from '../types';
import { TrashIcon } from '@heroicons/vue/24/outline';

// 1. Define las props que el componente espera recibir (la lista de participantes)
defineProps<{
  participants: Participant[];
}>();

// 2. Define los eventos que este componente puede emitir hacia el padre
defineEmits(['deleteParticipant']);
</script>

