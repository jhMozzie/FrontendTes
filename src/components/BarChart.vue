<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="font-bold text-lg mb-4">Participación por Campeonato</h3>
      <div class="h-64 flex items-center justify-center text-gray-400">
        Espacio para el gráfico de barras
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  interface ChartDataItem {
    name: string;
    participants: number;
  }
  
  const props = defineProps<{
    chartData: ChartDataItem[];
  }>();
  </script>