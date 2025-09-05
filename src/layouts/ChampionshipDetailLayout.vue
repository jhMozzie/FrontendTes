<template>
    <div class="flex h-screen bg-white">
      <!-- Sidebar Secundario (Contextual) -->
      <aside class="w-72 bg-white p-6 border-r flex-shrink-0">
        <div class="mb-8">
          <!-- Enlace para volver a la lista principal -->
          <router-link to="/championships" class="text-sm text-gray-500 hover:underline">
            &larr; Volver a Campeonatos
          </router-link>
          <!-- Aquí puedes cargar dinámicamente el nombre del campeonato -->
          <h1 class="text-2xl font-bold mt-2">Copa Verano 2025</h1>
        </div>
        
        <nav class="flex flex-col space-y-1">
          <!-- Enlaces de la sub-navegación -->
          <router-link 
            :to="{ name: 'ChampionshipDetailParticipants', params: { id: championshipId } }"
            class="flex items-center px-3 py-2 rounded-md text-gray-700"
            active-class="bg-gray-100 font-semibold"
          >
            <span class="ml-3">Lista de Participantes</span>
          </router-link>
  
          <router-link 
            :to="{ name: 'ChampionshipDetailCategories', params: { id: championshipId } }"
            class="flex items-center px-3 py-2 rounded-md text-gray-700"
            active-class="bg-gray-100 font-semibold"
          >
            <span class="ml-3">Categorías</span>
          </router-link>
  
          <router-link 
            :to="{ name: 'ChampionshipDetailBrackets', params: { id: championshipId } }"
            class="flex items-center px-3 py-2 rounded-md text-gray-700"
            active-class="bg-gray-100 font-semibold"
          >
            <span class="ml-3">Llaves</span>
          </router-link>
        </nav>
      </aside>
  
      <!-- Área de Contenido Principal -->
      <main class="flex-1 p-8 overflow-y-auto bg-gray-50">
        <!-- 
          Este router-view renderizará las vistas hijas del ChampionshipDetailLayout,
          como ChampionshipParticipants, ChampionshipCategories, etc.
        -->
        <router-view />
      </main>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  
  const route = useRoute();
  const championshipId = computed(() => route.params.id);
  
  // Aquí harías una llamada a la API con el championshipId para obtener
  // los datos del campeonato y mostrar el nombre en el título.
  </script>
  