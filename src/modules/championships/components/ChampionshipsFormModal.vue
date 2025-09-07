<template>
  <BaseModal 
    :is-open="isOpen" 
    :title="formTitle"
    @close="$emit('close')"
    @save="submitForm"
  >
    <template #body>
      <div>
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del Campeonato</label>
        <input v-model="form.name" type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
      </div>
      <div>
        <label for="academyId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Academia Organizadora</label>
        <select v-model="form.academyId" id="academyId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
          <option disabled value="">Seleccione una academia</option>
          <option v-for="academy in academies" :key="academy.id" :value="academy.id">{{ academy.name }}</option>
        </select>
      </div>
      <div>
        <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Inicio</label>
        <input v-model="form.startDate" type="date" id="startDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
      </div>
      <div>
        <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ubicación</label>
        <input v-model="form.location" type="text" id="location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import type { Championship } from '../types';
import type { Academy } from '@/modules/academies/types';

const props = defineProps<{
  isOpen: boolean;
  championshipToEdit: Championship | null;
  academies: Academy[];
}>();

const emit = defineEmits(['close', 'save']);

const form = ref({
  name: '',
  startDate: '',
  location: '',
  academyId: '',
});

const formTitle = computed(() => props.championshipToEdit ? 'Editar Campeonato' : 'Crear Nuevo Campeonato');

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.championshipToEdit) {
      const formattedDate = new Date(props.championshipToEdit.startDate).toISOString().split('T')[0];
      form.value = {
        name: props.championshipToEdit.name,
        startDate: formattedDate,
        location: props.championshipToEdit.location,
        academyId: String(props.championshipToEdit.academyId || ''),
      };
    } else {
      form.value = { name: '', startDate: '', location: '', academyId: '' };
    }
  }
});

const submitForm = () => {
  const dataToSave = {
    ...form.value,
    academyId: Number(form.value.academyId)
  };
  emit('save', dataToSave);
};
</script>

<style scoped>
/* Sin estilos aquí, todo está en el template */
</style>