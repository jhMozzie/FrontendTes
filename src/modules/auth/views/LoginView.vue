<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 px-4">
    <div class="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-white text-center mb-6">
        Iniciar Sesión
      </h2>

      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <label class="block text-sm text-gray-300">Correo</label>
          <input
            v-model="email"
            type="email"
            class="mt-1 w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm text-gray-300">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="mt-1 w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
          :disabled="loading"
        >
          <span v-if="loading">Ingresando...</span>
          <span v-else>Ingresar</span>
        </button>
      </form>

      <!-- mensajes -->
      <p v-if="successMessage" class="text-green-400 text-sm mt-4 text-center">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" class="text-red-400 text-sm mt-4 text-center">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = useAuthStore();

const loading = ref(false);
const successMessage = ref("");
const errorMessage = ref("");

const onSubmit = async () => {
  loading.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    const ok = await auth.login(email.value, password.value);

    if (ok) {
      successMessage.value = "Login exitoso, redirigiendo...";
      setTimeout(() => router.push("/championships"), 1000); // 👈 dale un delay
    }
  } catch (err) {
    errorMessage.value = "Credenciales inválidas";
  } finally {
    loading.value = false;
  }
};
</script>