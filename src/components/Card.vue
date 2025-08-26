<template>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-gray-500 uppercase text-sm font-semibold">{{ title }}</div>
      <div class="text-4xl font-bold text-gray-900 mt-2">{{ value }}</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  
  const props = defineProps({
    title: String,
    value: Number,
  });
  </script>