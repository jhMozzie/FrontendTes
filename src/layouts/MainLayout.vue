<template>
    <div class="relative min-h-screen bg-gray-900">
      <!-- Overlay para el modo móvil -->
      <div
        v-if="isSidebarOpen"
        @click="isSidebarOpen = false"
        class="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
      ></div>
  
      <!-- Componente Sidebar Principal -->
      <Sidebar :isOpen="isSidebarOpen" />
  
      <!-- Área de Contenido Principal -->
      <div class="md:pl-64">
        <main id="content">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <!-- Botón para abrir el sidebar en móvil -->
            <button @click="isSidebarOpen = !isSidebarOpen" type="button" class="mb-4 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600">
              <span class="sr-only">Open sidebar</span>
              <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
            
            <!-- 
              Este router-view renderizará las vistas hijas del MainLayout,
              como ChampionshipsListView, AcademiesListView, etc.
            -->
            <router-view></router-view>
  
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import Sidebar from '@/components/ui/Sidebar.vue';
  
  const isSidebarOpen = ref(false);
  </script>
  