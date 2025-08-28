<template>
  <!-- Contenedor del Sidebar -->
  <aside
    class="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white w-64 h-screen fixed top-0 left-0 z-40 transition-transform -translate-x-full md:translate-x-0"
    :class="{ 'translate-x-0': isOpen }"
    aria-label="Sidebar"
  >
    <!-- Contenido del Sidebar -->
    <div class="h-full px-3 py-4 overflow-y-auto">
      <!-- Logo y Título -->
      <a href="/" class="flex items-center ps-2.5 mb-5">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 me-3 sm:h-7" alt="Logo de la Aplicación" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Championship App</span>
      </a>

      <!-- Navegación con Router-Link -->
      <ul class="space-y-2 font-medium">
        <li>
          <router-link
            to="/"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
            </svg>
            <span class="ms-3">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/championships"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
              <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 1 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Campeonatos</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
// La prop 'isOpen' controla la visibilidad en modo móvil
// Se recibe desde el componente padre (App.vue)
defineProps({
  isOpen: Boolean,
});
</script>