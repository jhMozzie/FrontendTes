<template>
    <div>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Academias</h1>
        <button @click="openCreateModal" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          <span>Crear Academia</span>
        </button>
      </div>
  
      <div v-if="isLoading" class="text-center">Cargando...</div>
      <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
  
      <div v-else>
        <AcademiesTable 
          :academies="academies"
          @edit-academy="openEditModal"
          @delete-academy="openDeleteModal"
        />
      </div>
      
      <AcademyFormModal 
        :isOpen="isFormModalVisible" 
        :academyToEdit="selectedAcademy" 
        :users="users"
        @close="closeFormModal" 
        @save="handleSave" />
      <ConfirmDeleteModal 
        :isOpen="isDeleteModalVisible" 
        itemType="academia" 
        :itemName="selectedAcademy?.name" 
        @close="closeDeleteModal" 
        @confirm="handleDeleteConfirm" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import AcademiesTable from '@/modules/academies/components/AcademiesTable.vue';
  import AcademyFormModal from "@/modules/academies/components/AcademiesFormModal.vue";  import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue';
  import { getAcademies, createAcademy, updateAcademy, deleteAcademy } from '@/modules/academies/services';
  import { getUsers } from '@/modules/users/services'; // Importar servicio de usuarios
  import type { Academy } from '@/modules/academies/types';
  import type { User } from '@/modules/users/types'; // Importar tipo de usuario
  
  // State for academies
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  const academies = ref<Academy[]>([]);
  const selectedAcademy = ref<Academy | null>(null);
  
  // State for users (to populate the dropdown)
  const users = ref<User[]>([]);
  
  // State for modals
  const isFormModalVisible = ref(false);
  const isDeleteModalVisible = ref(false);
  
  const loadData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      // Cargar academias y usuarios en paralelo
      const [academiesData, usersData] = await Promise.all([
        getAcademies(),
        getUsers()
      ]);
      academies.value = academiesData;
      users.value = usersData;
    } catch (err) {
      error.value = 'No se pudieron cargar los datos.';
    } finally {
      isLoading.value = false;
    }
  };
  
  onMounted(loadData);
  
  // Modal logic
  const openCreateModal = () => {
    selectedAcademy.value = null;
    isFormModalVisible.value = true;
  };
  
  const openEditModal = (academy: Academy) => {
    selectedAcademy.value = { ...academy };
    isFormModalVisible.value = true;
  };
  
  const closeFormModal = () => {
    isFormModalVisible.value = false;
  };
  
  const handleSave = async (formData: Omit<Academy, 'id'>) => {
    try {
      if (selectedAcademy.value) {
        await updateAcademy(selectedAcademy.value.id, formData);
      } else {
        await createAcademy(formData);
      }
      await loadData(); // Recargar todos los datos
    } catch (err) {
      // Manejar error de guardado
    } finally {
      closeFormModal();
    }
  };
  
  const openDeleteModal = (academy: Academy) => {
    selectedAcademy.value = academy;
    isDeleteModalVisible.value = true;
  };
  
  const closeDeleteModal = () => {
    isDeleteModalVisible.value = false;
  };
  
  const handleDeleteConfirm = async () => {
    if (!selectedAcademy.value) return;
    try {
      await deleteAcademy(selectedAcademy.value.id);
      await loadData(); // Recargar todos los datos
    } catch (err) {
      // Manejar error de borrado
    } finally {
      closeDeleteModal();
    }
  };
  </script>