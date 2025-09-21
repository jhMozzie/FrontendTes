<template>
  <!-- Contenedor del Sidebar Principal -->
  <aside
    class="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 z-40 transition-transform -translate-x-full md:translate-x-0"
    :class="{ 'translate-x-0': isOpen }"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-4 flex flex-col justify-between overflow-y-auto">
      <!-- Parte superior: logo y menú -->
      <div>
        <!-- Logo y Título -->
        <router-link to="/" class="flex items-center ps-2.5 mb-5">
          <span class="self-center text-xl font-semibold whitespace-nowrap">
            Championship App
          </span>
        </router-link>

        <!-- Navegación Principal -->
        <ul class="space-y-2 font-medium">
          <li>
            <router-link
              to="/dashboard"
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <HomeIcon class="w-5 h-5 text-gray-400 group-hover:text-white" />
              <span>Dashboard</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/championships"
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <TrophyIcon class="w-5 h-5 text-gray-400 group-hover:text-white" />
              <span>Campeonatos</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/academies"
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <BuildingLibraryIcon
                class="w-5 h-5 text-gray-400 group-hover:text-white"
              />
              <span>Academias</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/students"
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <UsersIcon class="w-5 h-5 text-gray-400 group-hover:text-white" />
              <span>Estudiantes</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/users"
              class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <UserIcon class="w-5 h-5 text-gray-400 group-hover:text-white" />
              <span>Usuarios</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Parte inferior: botón de logout -->
      <div class="border-t border-gray-700 pt-4">
        <button
          @click="onLogout"
          class="w-full flex items-center gap-3 p-2 rounded-lg text-sm font-medium text-gray-300 bg-gray-700 hover:bg-red-600 hover:text-white transition-colors"
        >
          <ArrowLeftOnRectangleIcon class="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/modules/auth/store/authStore";

// Heroicons
import {
  HomeIcon,
  UsersIcon,
  UserIcon,
  TrophyIcon,
  BuildingLibraryIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/vue/24/outline";

defineProps({
  isOpen: Boolean,
});

const router = useRouter();
const auth = useAuthStore();

const onLogout = () => {
  auth.logout(); // limpia token + usuario
  router.push("/login"); // redirige al login
};
</script>