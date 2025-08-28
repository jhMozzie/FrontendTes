<template>
    <!-- Overlay y contenedor principal del modal -->
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
        <!-- Encabezado del Modal -->
        <div class="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ formTitle }}</h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
  
        <!-- Cuerpo del Formulario -->
        <div class="p-6">
          <form @submit.prevent="submitForm">
            <div class="space-y-4">
              <!-- Campo Nombre -->
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nombre del Campeonato</label>
                <input type="text" id="name" v-model="form.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Ej: Torneo Nacional" required>
              </div>
              <!-- Campo Fecha -->
              <div>
                <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fecha de Inicio</label>
                <input type="date" id="startDate" v-model="form.startDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
              </div>
              <!-- Campo Ubicación -->
              <div>
                <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ubicación</label>
                <input type="text" id="location" v-model="form.location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Ej: Gimnasio Nacional" required>
              </div>
            </div>
            <!-- Pie del Modal con Botones -->
            <div class="flex justify-end items-center pt-6 space-x-3">
              <button @click="$emit('close')" type="button" class="py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Cancelar</button>
              <button type="submit" class="py-2 px-4 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, computed } from 'vue';
  
  // Definición de la interfaz para un campeonato
  interface Championship {
    id?: number;
    name: string;
    startDate: string;
    location: string;
  }
  
  // Props que el componente recibe
  const props = defineProps<{
    isOpen: boolean;
    championshipToEdit?: Championship | null;
  }>();
  
  // Eventos que el componente puede emitir
  const emit = defineEmits(['close', 'save']);
  
  // Estado reactivo para el formulario
  const form = ref<Championship>({
    name: '',
    startDate: '',
    location: '',
  });
  
  // Título dinámico para el modal
  const formTitle = computed(() => props.championshipToEdit ? 'Editar Campeonato' : 'Crear Nuevo Campeonato');
  
  // Observador para rellenar el formulario cuando se edita un campeonato
  watch(() => props.championshipToEdit, (newVal) => {
    if (newVal) {
      form.value = { ...newVal };
    } else {
      // Limpiar el formulario si no hay nada que editar
      form.value = { name: '', startDate: '', location: '' };
    }
  });
  
  // Función para manejar el envío del formulario
  const submitForm = () => {
    emit('save', form.value);
  };
  </script>
  