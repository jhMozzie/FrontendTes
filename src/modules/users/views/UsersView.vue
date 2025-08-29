<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Usuarios</h1>
      <button @click="openCreateModal"
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        <span>Crear Usuario</span>
      </button>
    </div>

    <div v-if="isLoading" class="text-center text-gray-500 dark:text-gray-400">Cargando...</div>
    <div v-else-if="error" class="text-center text-red-500 dark:text-red-400">{{ error }}</div>

    <div v-else>
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">Lista de Usuarios</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Username
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Admin
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-if="users.length === 0">
                <td colspan="4" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No hay usuarios.</td>
              </tr>
              <tr v-for="user in users" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{{
                  user.username }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <span
                    :class="user.isAdmin ? 'font-semibold text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'">
                    {{ user.isAdmin ? 'Sí' : 'No' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  <button @click="openEditModal(user)"
                    class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Editar">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z">
                      </path>
                    </svg>
                  </button>
                  <button @click="openDeleteModal(user)"
                    class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Eliminar">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                      </path>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <UserFormModal 
          :isOpen="isFormModalVisible" 
          :userToEdit="selectedUser"
          @close="closeFormModal"
          @save="handleSave"
        />
      <ConfirmDeleteModal :isOpen="isDeleteModalVisible" :itemName="selectedUser?.username" @close="closeDeleteModal"
        @confirm="handleDeleteConfirm" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UserFormModal from '@/modules/users/components/UserFormModal.vue';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal.vue'; // Asumiendo que este es reutilizable
import { getUsers, createUser, updateUser, deleteUser } from '../services';
import type { User } from '../types';

const isLoading = ref(true);
const error = ref<string | null>(null);
const users = ref<User[]>([]);
const isFormModalVisible = ref(false);
const isDeleteModalVisible = ref(false);
const selectedUser = ref<User | null>(null);

const loadUsers = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    users.value = await getUsers();
  } catch (err) {
    error.value = 'No se pudieron cargar los usuarios.';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadUsers);

const openCreateModal = () => {
  selectedUser.value = null;
  isFormModalVisible.value = true;
};

const openEditModal = (user: User) => {
  selectedUser.value = { ...user };
  isFormModalVisible.value = true;
};

const closeFormModal = () => {
  isFormModalVisible.value = false;
};

const handleSave = async (formData: any) => {
  try {
    if (selectedUser.value) {
      await updateUser(selectedUser.value.id, formData);
    } else {
      await createUser(formData);
    }
    await loadUsers();
  } catch (err) {
    error.value = 'Error al guardar el usuario.';
    console.error(err);
  } finally {
    closeFormModal();
  }
};

const openDeleteModal = (user: User) => {
  selectedUser.value = user;
  isDeleteModalVisible.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalVisible.value = false;
};

const handleDeleteConfirm = async () => {
  if (!selectedUser.value) return;
  try {
    await deleteUser(selectedUser.value.id);
    await loadUsers();
  } catch (err) {
    error.value = 'Error al eliminar el usuario.';
    console.error(err);
  } finally {
    closeDeleteModal();
  }
};
</script>