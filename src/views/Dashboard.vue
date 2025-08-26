<template>
  <div class="flex min-h-screen bg-gray-100">
    <Sidebar />

    <main class="flex-grow p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div v-if="isLoading" class="text-center text-gray-500">
        Cargando datos...
      </div>
      <div v-else-if="error" class="text-center text-red-500">
        {{ error }}
      </div>
      <div v-else class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Total Campeonatos" :value="metrics.totalChampionships" />
          <Card title="Total Estudiantes" :value="metrics.totalStudents" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart :chartData="participationData" />
          <PieChart :chartData="studentDistributionData" />
        </div>

        <UpcomingChampionshipsTable :championships="upcomingChampionships" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import Sidebar from '../components/Sidebar.vue';
  import Card from '../components/Card.vue';
  import BarChart from '../components/BarChart.vue';
  import PieChart from '../components/PieChart.vue';
  import UpcomingChampionshipsTable from '../components/UpcomingChampionshipsTable.vue';
  import { mockData } from '../mockData.ts';

  const isLoading = ref(true);
  const error = ref<string | null>(null);
  
  const metrics = ref({ totalChampionships: 0, totalStudents: 0 });
  const participationData = ref([]);
  const studentDistributionData = ref([]);
  const upcomingChampionships = ref([]);

  const loadData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = mockData;
      
      metrics.value.totalChampionships = data.totalChampionships;
      metrics.value.totalStudents = data.totalStudents;
      participationData.value = data.championshipParticipation;
      studentDistributionData.value = data.studentDistribution;
      upcomingChampionships.value = data.upcomingChampionships;
    } catch (err) {
      error.value = 'No se pudieron cargar los datos del dashboard.';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    loadData();
  });
</script>