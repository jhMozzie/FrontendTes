<template>
  <aside
    class="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white w-64 h-screen fixed top-0 left-0 z-40 transition-transform -translate-x-full md:translate-x-0"
    :class="{ 'translate-x-0': isOpen }"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 overflow-y-auto">
      <a href="/" class="flex items-center ps-2.5 mb-5">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 me-3 sm:h-7" alt="Logo de la Aplicación" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Championship App</span>
      </a>

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
            <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M15.5 2.5a2.5 2.5 0 0 0-5 0V4h5V2.5ZM13 6H7v2h6V6Zm-4-5a4.5 4.5 0 0 0-4.475 4.194L2 10.5v5l1 1h14l1-1v-5l-.525-4.306A4.5 4.5 0 0 0 11 1Zm5 14H4v-4h12v4Z"/>
            </svg>
            <span class="flex-1 ms-3 whitespace-nowrap">Campeonatos</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/academies"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
               <path d="M12.25 8.25a2.75 2.75 0 1 0-5.5 0 2.75 2.75 0 0 0 5.5 0ZM9.5 12.5a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Z"/>
               <path d="M2 18.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h16a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H2Zm.5-1h15v-3H2.5v3Z"/>
               <path d="M1 14.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h18a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H1Z"/>
            </svg>
            <span class="ms-3">Academias</span>
          </router-link>
        </li>
       <li>
          <router-link
            to="/students"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-2a6.957 6.957 0 0 1 1.264-3H2a1 1 0 0 1 0-2h1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1a1 1 0 0 1 0 2Z"/>
            </svg>
            <span class="ms-3">Estudiantes</span>
          </router-link>
        </li>
         <li>
          <router-link
            to="/users"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 18">
              <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
            </svg>
            <span class="ms-3">Usuarios</span>
          </router-link>
        </li>
         <li>
          <router-link
            to="/settings"
            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 7.5h-2.021a2.986 2.986 0 0 0-1.238-1.921l1.436-1.436a1 1 0 0 0 0-1.414L14.763 1.313a1 1 0 0 0-1.414 0L11.912 2.75a2.989 2.989 0 0 0-1.922-1.238V.5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1.011A2.988 2.988 0 0 0 4.068 2.75L2.632 1.313a1 1 0 0 0-1.414 0L.034 2.727a1 1 0 0 0 0 1.414l1.436 1.436A2.986 2.986 0 0 0 2.021 7.5H.5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1.521a2.986 2.986 0 0 0 1.238 1.921l-1.436 1.436a1 1 0 0 0 0 1.414l1.184 1.184a1 1 0 0 0 1.414 0l1.436-1.436a2.989 2.989 0 0 0 1.922 1.238V18.5a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1.011a2.988 2.988 0 0 0 1.932-1.238l1.436 1.436a1 1 0 0 0 1.414 0l1.184-1.184a1 1 0 0 0 0-1.414l-1.436-1.436a2.986 2.986 0 0 0-1.238-1.921H18.5a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Zm-8 5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/>
            </svg>
            <span class="ms-3">Configuración</span>
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