<template>
    <BaseModal 
      :is-open="isOpen" 
      title="Inscribir Participante"
      @close="$emit('close')"
      @save="submitForm"
    >
      <!-- El #body corresponde al <slot name="body"> en BaseModal -->
      <template #body>
        <!-- Campo para seleccionar el Estudiante -->
        <div>
          <label for="studentId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estudiante</label>
          <select v-model="form.studentId" id="studentId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
            <option disabled value="">Seleccione un estudiante</option>
            <option v-for="student in availableStudents" :key="student.id" :value="student.id">
              {{ student.firstname }} {{ student.lastname }}
            </option>
          </select>
        </div>
        <!-- Campo para seleccionar la Categoría -->
        <div class="mt-4">
          <label for="categoryId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría</label>
          <select v-model="form.championshipCategoryId" id="categoryId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
            <option disabled value="">Seleccione una categoría</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ `${category.modality} - ${category.ageRange} ${category.gender}` }}
            </option>
          </select>
        </div>
      </template>
    </BaseModal>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import BaseModal from '@/components/ui/BaseModal.vue';
  import type { Student, ChampionshipCategory } from '../types';
  
  // El modal recibe la lista de todos los estudiantes y las categorías del campeonato
  defineProps<{
    isOpen: boolean;
    availableStudents: Student[];
    categories: ChampionshipCategory[];
  }>();
  
  const emit = defineEmits(['close', 'save']);
  
  // Estado local para los datos del formulario
  const form = ref({
    studentId: '',
    championshipCategoryId: '',
  });
  
  const submitForm = () => {
    // Validamos que ambos campos estén seleccionados
    if (!form.value.studentId || !form.value.championshipCategoryId) {
      alert('Por favor, seleccione un estudiante y una categoría.');
      return;
    }
    // Emitimos el evento 'save' con los datos hacia el componente padre
    emit('save', { 
      studentId: Number(form.value.studentId),
      championshipCategoryId: Number(form.value.championshipCategoryId)
    });
    // Limpiamos el formulario después de enviar para la próxima vez que se abra
    form.value = { studentId: '', championshipCategoryId: '' };
  };
  </script>