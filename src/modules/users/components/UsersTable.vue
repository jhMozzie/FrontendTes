<template>
    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 class="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">Lista de Usuarios</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Username</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Admin</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-if="users.length === 0">
              <td colspan="4" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No hay usuarios para mostrar.</td>
            </tr>
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{{ user.username }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <span :class="user.isAdmin ? 'text-green-600 font-semibold' : 'text-gray-500'">
                  {{ user.isAdmin ? 'Sí' : 'No' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button @click="$emit('editUser', user)" class="text-indigo-600 hover:text-indigo-900" title="Editar">
                  Editar
                </button>
                <button @click="$emit('deleteUser', user)" class="text-red-600 hover:text-red-900" title="Eliminar">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { User } from '../types';
  
  // 1. Define las props que el componente espera recibir (la lista de usuarios).
  defineProps<{
    users: User[];
  }>();
  
  // 2. Define los eventos que este componente puede emitir hacia el padre.
  defineEmits(['editUser', 'deleteUser']);
  </script>