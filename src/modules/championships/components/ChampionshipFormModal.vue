<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900/50">
      
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ formTitle }}</h3>
            <button @click="$emit('close')" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 14 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/></svg>
            </button>
          </div>

          <form @submit.prevent="submitForm">
            <div class="p-4 md:p-5 space-y-4">
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del Campeonato</label>
                <input v-model="form.name" type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500" required>
              </div>

              <div>
                <label for="academyId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Academia Organizadora</label>
                <select v-model="form.academyId" id="academyId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500" required>
                  <option disabled value="">Seleccione una academia</option>
                  <option v-for="academy in academies" :key="academy.id" :value="academy.id">
                    {{ academy.name }}
                  </option>
                </select>
              </div>
              <div>
                <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Inicio</label>
                <input v-model="form.startDate" type="date" id="startDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500" required>
              </div>
              <div>
                <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ubicación</label>
                <input v-model="form.location" type="text" id="location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500" required>
              </div>
            </div>

            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">Guardar</button>
              <button @click="$emit('close')" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancelar</button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { Championship } from '../types';
import type { Academy } from '@/modules/academies/types'; // Importa el tipo Academy

const props = defineProps<{
  isOpen: boolean;
  championshipToEdit?: Championship | null;
  academies: Academy[]; // <-- AÑADE ESTA PROP para recibir la lista de academias
}>();

const emit = defineEmits(['close', 'save']);

const form = ref<any>({ // Usamos 'any' temporalmente para flexibilidad
  name: '',
  startDate: '',
  location: '',
  academyId: '', // <-- AÑADE academyId al estado del formulario
});

const formTitle = computed(() => props.championshipToEdit ? 'Editar Campeonato' : 'Crear Nuevo Campeonato');

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.championshipToEdit) {
      form.value = { ...props.championshipToEdit };
    } else {
      // Limpia el formulario
      form.value = { name: '', startDate: '', location: '', academyId: '' };
    }
  }
});

const submitForm = () => {
  // Asegúrate de que el ID se envíe como número
  const dataToSave = {
    ...form.value,
    academyId: Number(form.value.academyId)
  };
  emit('save', dataToSave);
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>