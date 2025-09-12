<template>
  <BaseModal 
    :is-open="isOpen" 
    :title="formTitle"
    @close="$emit('close')"
    @save="submitForm"
  >
    <template #body>
      <!-- Formulario específico para Categorías -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <!-- CAMBIO: Clases aplicadas directamente -->
          <label for="code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Código (Ej: A1)</label>
          <input v-model="form.code" type="text" id="code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
        </div>

        <div>
          <label for="modality" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Modalidad (Ej: KUMITE)</label>
          <input v-model="form.modality" type="text" id="modality" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
        </div>
        <div>
          <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Género (Ej: MASCULINO)</label>
          <input v-model="form.gender" type="text" id="gender" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
        </div>
        <div>
          <label for="ageCategory" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría de Edad (Ej: JUVENIL)</label>
          <input v-model="form.ageCategory" type="text" id="ageCategory" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
        </div>
        <div>
          <label for="ageRange" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rango de Edad (Ej: 14-16 años)</label>
          <input v-model="form.ageRange" type="text" id="ageRange" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
        </div>
        <div class="md:col-span-2">
          <label for="skillLevel" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nivel de Habilidad (Ej: CINTA NEGRA)</label>
          <input v-model="form.skillLevel" type="text" id="skillLevel" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import type { ChampionshipCategory } from '../types';

const props = defineProps<{
  isOpen: boolean;
  categoryToEdit: Omit<ChampionshipCategory, 'id' | 'participants'> | null;
}>();

const emit = defineEmits(['close', 'save']);

const initialFormState = {
  code: '',
  modality: '',
  ageCategory: '',
  ageRange: '',
  gender: '',
  skillLevel: '',
};

const form = ref({ ...initialFormState });
const formTitle = computed(() => props.categoryToEdit ? 'Editar Categoría' : 'Crear Nueva Categoría');

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.categoryToEdit) {
      form.value = { 
          ...props.categoryToEdit,
          code: props.categoryToEdit.code || ''
      };
    } else {
      form.value = { ...initialFormState };
    }
  }
});

const submitForm = () => {
  emit('save', { ...form.value });
};
</script>

<!-- CAMBIO: El bloque de <style> ha sido eliminado -->

