<template>
  <!-- 
    App.vue ahora solo contiene el router-view principal.
    Vue Router decidirá si aquí se renderiza MainLayout o ChampionshipDetailLayout
    basado en la URL actual.
  -->
  <router-view />
</template>

<script setup lang="ts">
// No se necesita lógica aquí.
</script>

<style>
/* Mantén tus estilos globales aquí */
body {
  font-family: 'Inter', sans-serif;
}
</style>
