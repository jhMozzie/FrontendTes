<template>
  <Transition name="modal-fade">
    <div v-if="isOpen" class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900/50">
      
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ formTitle }}
            </h3>
            <button @click="$emit('close')" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <form @submit.prevent="submitForm">
            <div class="p-4 md:p-5 space-y-4">
              <div>
                <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input v-model="formData.username" type="text" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
              </div>
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input v-model="formData.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                <input v-model="formData.password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" :required="!userToEdit">
                 <p v-if="userToEdit" class="text-xs text-gray-500 dark:text-gray-400 mt-1">Dejar en blanco para no cambiar</p>
              </div>
              <div class="flex items-center">
                <input v-model="formData.isAdmin" id="isAdmin" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="isAdmin" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">¿Es Administrador?</label>
              </div>
            </div>

            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Guardar
              </button>
              <button @click="$emit('close')" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Cancelar
              </button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { User } from '../types';

interface UserFormData {
  username: string;
  email: string;
  password?: string;
  isAdmin: boolean;
}

const props = defineProps<{
  isOpen: boolean;
  userToEdit: User | null;
}>();

const emit = defineEmits(['close', 'save']);

const initialFormData: UserFormData = {
  username: '',
  email: '',
  password: '',
  isAdmin: false,
};

const formData = ref<UserFormData>({ ...initialFormData });

const formTitle = computed(() => props.userToEdit ? 'Editar Usuario' : 'Crear Usuario');

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.userToEdit) {
      formData.value = { 
        username: props.userToEdit.username,
        email: props.userToEdit.email,
        isAdmin: props.userToEdit.isAdmin,
      };
    } else {
      formData.value = { ...initialFormData };
    }
  }
});

const submitForm = () => {
  const dataToSend: UserFormData = { ...formData.value };
  
  if (props.userToEdit && !dataToSend.password) {
    delete dataToSend.password;
  }
  emit('save', dataToSend);
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