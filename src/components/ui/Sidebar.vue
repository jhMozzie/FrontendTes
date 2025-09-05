<template>
  <!-- Contenedor del Sidebar Principal -->
  <aside
    class="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 z-40 transition-transform -translate-x-full md:translate-x-0"
    :class="{ 'translate-x-0': isOpen }"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto">
      <!-- Logo y Título -->
      <router-link to="/" class="flex items-center ps-2.5 mb-5">
        <span class="self-center text-xl font-semibold whitespace-nowrap">Championship App</span>
      </router-link>

      <!-- Navegación Principal -->
      <ul class="space-y-2 font-medium">
        <li>
          <router-link to="/dashboard" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
            <!-- Icono Dashboard -->
            <span class="ms-3">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/championships" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
            <!-- Icono Campeonatos -->
            <span class="ms-3">Campeonatos</span>
          </router-link>
        </li>
        <li>
          <router-link to="/academies" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
            <!-- Icono Academias -->
            <span class="ms-3">Academias</span>
          </router-link>
        </li>
        <li>
          <router-link to="/students" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
            <!-- Icono Estudiantes -->
            <span class="ms-3">Estudiantes</span>
          </router-link>
        </li>
         <li>
          <router-link to="/users" class="flex items-center p-2 rounded-lg hover:bg-gray-700 group">
            <!-- Icono Usuarios -->
            <span class="ms-3">Usuarios</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
// La prop 'isOpen' controla la visibilidad en modo móvil
defineProps({
  isOpen: Boolean,
});
</script>
