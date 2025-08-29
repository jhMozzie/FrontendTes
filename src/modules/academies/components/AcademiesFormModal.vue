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
                  <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de la Academia</label>
                  <input v-model="form.name" type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500" required>
                </div>
                <div>
                  <label for="userId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario Propietario</label>
                  <select v-model="form.userId" id="userId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500" required>
                    <option disabled value="">Seleccione un usuario</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                      {{ user.username }}
                    </option>
                  </select>
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
  import type { Academy } from '../types';
  import type { User } from '@/modules/users/types';
  
  const props = defineProps<{
    isOpen: boolean;
    academyToEdit: Academy | null;
    users: User[];
  }>();
  
  const emit = defineEmits(['close', 'save']);
  
  // ESTADO INICIAL CORREGIDO: sin address ni phone
  const initialFormState = { name: '', userId: '' };
  const form = ref<any>({ ...initialFormState });
  
  const formTitle = computed(() => props.academyToEdit ? 'Editar Academia' : 'Crear Academia');
  
  watch(() => props.isOpen, (newVal) => {
    if (newVal) {
      if (props.academyToEdit) {
        // Al editar, solo copiamos los campos que existen en el tipo Academy
        form.value = { 
          name: props.academyToEdit.name,
          userId: props.academyToEdit.userId 
        };
      } else {
        form.value = { ...initialFormState };
      }
    }
  });
    
  const submitForm = () => {
    const dataToSave = {
      ...form.value,
      userId: Number(form.value.userId),
    };
    emit('save', dataToSave);
  };
  </script>
    
  <style scoped>
  .modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
  .modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
  </style>