<template>
    <div>
      <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Estudiantes</h1>
        
        <div class="flex items-center gap-4">
          <select 
            v-model="selectedAcademyId"
            class="w-full md:w-80 p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            <option value="all">Todas las Academias</option>
            <option v-for="academy in academies" :key="academy.id" :value="academy.id">
              {{ academy.name }}
            </option>
          </select>
          
          <button @click="openCreateModal" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            <span>Crear</span>
          </button>
        </div>
      </div>
  
      <div v-if="isLoading" class="text-center py-10 text-gray-500 dark:text-gray-400">Cargando...</div>
      <div v-else-if="error" class="text-center text-red-500 py-10">{{ error }}</div>
  
      <div v-else>
        <StudentsTable 
          :students="students"
          @edit-student="openEditModal"
          @delete-student="openDeleteModal"
        />
      </div>
      
      <StudentsFormModal 
          :isOpen="isFormModalVisible" 
          :studentToEdit="selectedStudent" 
          :users="users"
          :academies="academies"
          @close="closeFormModal" 
          @save="handleSave" />
      <ConfirmDeleteModal 
          :isOpen="isDeleteModalVisible" 
          itemType="estudiante" 
          :itemName="selectedStudent ? `${selectedStudent.firstname} ${selectedStudent.lastname}` : ''" 
          @close="closeDeleteModal" 
          @confirm="handleDeleteConfirm" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import StudentsTable from '../components/StudentsTable.vue';
  import StudentsFormModal from '../components/StudentsFormModal.vue';
  import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue';
  import { getStudents, getStudentsByAcademyId, createStudent, updateStudent, deleteStudent } from '../services';
  import { getUsers } from '@/modules/users/services';
  import { getAcademies } from '@/modules/academies/services';
  import type { Student } from '../types';
  import type { User } from '@/modules/users/types';
  import type { Academy } from '@/modules/academies/types';
  
  // Estado General
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  const router = useRouter();
  
  // Estado de los Datos
  const students = ref<Student[]>([]);
  const academies = ref<Academy[]>([]);
  const users = ref<User[]>([]);
  
  // Estado del Filtro
  const selectedAcademyId = ref<number | 'all'>('all');
  
  // Estado para los Modales
  const isFormModalVisible = ref(false);
  const isDeleteModalVisible = ref(false);
  const selectedStudent = ref<Student | null>(null);
  
  // Carga los datos iniciales necesarios para la vista y los formularios
  const loadInitialData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const [studentsData, academiesData, usersData] = await Promise.all([
        getStudents(),      // Carga todos los estudiantes por defecto
        getAcademies(),     // Carga las academias para el dropdown
        getUsers(),         // Carga los usuarios para el formulario de creación
      ]);
      students.value = studentsData;
      academies.value = academiesData;
      users.value = usersData;
    } catch (err) {
      error.value = "No se pudieron cargar los datos iniciales.";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };
  onMounted(loadInitialData);
  
  // Función para recargar la lista de estudiantes según el filtro seleccionado
  const fetchFilteredStudents = async (id: number | 'all') => {
    isLoading.value = true;
    error.value = null;
    try {
      if (id === 'all') {
        students.value = await getStudents();
      } else {
        students.value = await getStudentsByAcademyId(id);
      }
    } catch (err) {
      error.value = "No se pudieron filtrar los estudiantes.";
      students.value = [];
    } finally {
      isLoading.value = false;
    }
  };
  
  // Observador que se activa cuando el usuario cambia la selección en el dropdown
  watch(selectedAcademyId, (newId) => {
  fetchFilteredStudents(newId);
  
  // 3. Actualiza la URL del navegador con el nuevo parámetro
  router.push({ query: { academyId: newId === 'all' ? undefined : newId } });
});
  
  // Función para refrescar la lista actual sin cambiar el filtro
  const refreshCurrentList = () => {
    fetchFilteredStudents(selectedAcademyId.value);
  }
  
  // --- Lógica para manejo de Modales ---
  
  const openCreateModal = () => {
    selectedStudent.value = null;
    isFormModalVisible.value = true;
  };
  const openEditModal = (student: Student) => {
    selectedStudent.value = student;
    isFormModalVisible.value = true;
  };
  const closeFormModal = () => {
    isFormModalVisible.value = false;
  };
  
  const handleSave = async (formData: any) => {
    try {
      if (selectedStudent.value) {
        await updateStudent(selectedStudent.value.id, formData);
      } else {
        await createStudent(formData);
      }
      await refreshCurrentList(); // Refresca la lista actual
    } catch (err) {
      console.error("Error al guardar:", err);
    } finally {
      closeFormModal();
    }
  };
  
  const openDeleteModal = (student: Student) => {
    selectedStudent.value = student;
    isDeleteModalVisible.value = true;
  };
  const closeDeleteModal = () => {
    isDeleteModalVisible.value = false;
  };
  
  const handleDeleteConfirm = async () => {
    if (!selectedStudent.value) return;
    try {
      await deleteStudent(selectedStudent.value.id);
      await refreshCurrentList(); // Refresca la lista actual
    } catch (err) {
      console.error("Error al eliminar:", err);
    } finally {
      closeDeleteModal();
    }
  };
  </script>