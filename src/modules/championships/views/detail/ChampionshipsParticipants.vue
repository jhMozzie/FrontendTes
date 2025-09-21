<template>
  <div>
    <!-- Encabezado Principal de la Sección -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Gestión de Participantes</h1>
    </div>

    <!-- Manejo de estados de carga y error -->
    <div v-if="isLoading" class="text-center text-gray-500 dark:text-gray-400 mt-10">
      Cargando...
    </div>
    <div v-else-if="error" class="text-center text-red-500 dark:text-red-400 mt-10">
      {{ error }}
    </div>

    <!-- Contenido Principal -->
    <div v-else class="space-y-8">
      <!-- 1. Selector de Categoría -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <label for="category-select" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Paso 1: Seleccione una categoría para ver y gestionar sus participantes
        </label>
        <select 
          id="category-select" 
          v-model="selectedCategoryId"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option :value="null" disabled>-- Elija una categoría --</option>
          <option v-for="category in championship?.categories" :key="category.id" :value="category.id">
            {{ `${category.code} - ${category.modality} - ${category.ageRange} ${category.gender}` }}
          </option>
        </select>
      </div>

      <!-- 2. Sección que aparece SÓLO si se ha seleccionado una categoría -->
      <div v-if="selectedCategory">
        <!-- Encabezado de la categoría con botón para añadir participante -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Inscritos en: {{ selectedCategory.modality }}</h2>
          <button 
            @click="openModal"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            <span>Inscribir en esta Categoría</span>
          </button>
        </div>

        <!-- CAMBIO: Ahora usamos el componente de tabla reutilizable -->
        <ParticipantsTable 
          :participants="selectedCategory.participants || []"
          @deleteParticipant="handleDelete"
        />
      </div>
    </div>

    <!-- Modal para inscribir participantes -->
    <BaseModal v-if="selectedCategory"
      :is-open="isModalOpen" 
      title="Inscribir Participante"
      @close="closeModal"
      @save="handleSave"
    >
      <template #body>
        <div>
          <label for="studentId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estudiante</label>
          <select v-model="form.studentId" id="studentId" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
            <option disabled value="">Seleccione un estudiante</option>
            <option v-for="student in allStudents" :key="student.id" :value="student.id">
              {{ student.firstname }} {{ student.lastname }}
            </option>
          </select>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
// Importamos los servicios necesarios
import { getChampionshipById, createParticipant, deleteParticipant } from '../../services';
import { getStudents } from '@/modules/students/services';
// Importamos los tipos y componentes
import type { Championship, ChampionshipCategory, Student, Participant, CreateParticipantPayload } from '../../types';
import BaseModal from '@/components/ui/BaseModal.vue';
import ParticipantsTable from '../../components/ParticipantsTable.vue'; // <-- Importamos el nuevo componente

const route = useRoute();
const championshipId = Number(route.params.id);

// --- ESTADO DE LA VISTA ---
const championship = ref<Championship | null>(null);
const allStudents = ref<Student[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);
const selectedCategoryId = ref<number | null>(null);
const isModalOpen = ref(false);

// Estado para el formulario del modal
const form = ref({ studentId: '' });

// --- PROPIEDADES COMPUTADAS ---
const selectedCategory = computed<ChampionshipCategory | undefined>(() => {
  if (!championship.value || !selectedCategoryId.value) {
    return undefined;
  }
  const idToFind = Number(selectedCategoryId.value);
  return championship.value.categories?.find(cat => cat.id === idToFind);
});

// --- LÓGICA DE CARGA DE DATOS ---
const loadData = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const [championshipData, studentsData] = await Promise.all([
      getChampionshipById(championshipId),
      getStudents(), // Necesitamos la lista de todos los estudiantes para el modal
    ]);
    championship.value = championshipData;
    allStudents.value = studentsData;
  } catch (err: any) {
    console.error('Error al cargar datos:', err);
    error.value = err.response?.data?.message || 'No se pudieron cargar los datos necesarios.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadData);

// --- MANEJO DEL MODAL ---
const openModal = () => isModalOpen.value = true;
const closeModal = () => isModalOpen.value = false;

const handleSave = async () => {
  if (!selectedCategoryId.value || !form.value.studentId) {
    alert("Por favor, seleccione un estudiante.");
    return;
  }
  try {
    const payload: CreateParticipantPayload = {
      studentId: Number(form.value.studentId),
      championshipCategoryId: selectedCategoryId.value,
    };
    await createParticipant(payload);
    await loadData();
  } catch (err) {
    console.error('Error al inscribir participante:', err);
    alert('Error al inscribir al participante. Verifique la consola.');
  } finally {
    closeModal();
    form.value.studentId = '';
  }
};

const handleDelete = async (participant: Participant) => {
  if (confirm(`¿Seguro que quieres eliminar la inscripción de ${participant.student.firstname}?`)) {
    try {
      await deleteParticipant(participant.id);
      await loadData();
    } catch (err) {
      console.error('Error al eliminar participante:', err);
      alert('Error al eliminar al participante. Verifique la consola.');
    }
  }
};
</script>
