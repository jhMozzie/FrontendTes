<template>
    <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
      <!-- Usamos nuestro nuevo componente reutilizable -->
      <DetailSidebar 
        :title="title"
        :back-route="backRoute"
        :nav-links="navLinks"
      />
  
      <!-- Área de Contenido Principal -->
      <main class="flex-1 p-8 overflow-y-auto">
        <!-- Aquí se renderizarán las vistas hijas (Participantes, Perfil, etc.) -->
        <router-view />
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import DetailSidebar, { type NavLink } from '@/components/ui/DetailSidebar.vue';
  import type { RouteLocationRaw } from 'vue-router';
  
  // Este layout también recibe las props para pasárselas al sidebar
  defineProps<{
    title: string;
    backRoute: RouteLocationRaw;
    navLinks: NavLink[];
  }>();
  </script>
  
  