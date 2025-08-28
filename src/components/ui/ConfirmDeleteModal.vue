<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 p-6 text-center">
        <!-- Icono de Advertencia -->
        <svg class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        
        <!-- Mensaje de Confirmación -->
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          ¿Estás seguro de que quieres eliminar el campeonato <br>
          <span class="font-bold">{{ championshipName }}</span>?
        </h3>
        
        <!-- Botones de Acción -->
        <button @click="$emit('confirm')" class="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
          Sí, estoy seguro
        </button>
        <button @click="$emit('close')" class="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">
          No, cancelar
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    isOpen: boolean;
    championshipName?: string;
  }>();
  
  defineEmits(['close', 'confirm']);
  </script>
  