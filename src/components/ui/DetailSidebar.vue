<template>
    <aside class="w-72 bg-white dark:bg-gray-800 p-6 border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
      <div class="mb-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">
          {{ title }}
        </h2>
        <router-link :to="backRoute" class="text-sm text-indigo-500 hover:underline mt-1">&larr; Volver a la lista</router-link>
      </div>
      
      <nav class="flex flex-col space-y-2">
        <!-- Iteramos sobre los enlaces que recibimos por props -->
        <router-link 
          v-for="link in navLinks"
          :key="link.name"
          :to="link.to"
          class="flex items-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          active-class="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold"
        >
          <span>{{ link.icon }}</span>
          <span class="ml-3">{{ link.label }}</span>
        </router-link>
      </nav>
    </aside>
  </template>
  
  <script setup lang="ts">
  import type { RouteLocationRaw } from 'vue-router';
  
  // Definimos la estructura de un enlace para la navegación
  export interface NavLink {
    to: RouteLocationRaw;
    label: string;
    icon: string;
    name: string;
  }
  
  // El componente recibe el título, la ruta de regreso y la lista de enlaces
  defineProps<{
    title: string;
    backRoute: RouteLocationRaw;
    navLinks: NavLink[];
  }>();
  </script>
  
  