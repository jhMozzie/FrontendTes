<template>
    <Transition name="modal-fade">
        <div v-if="isOpen"
            class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900/50">

            <div class="relative p-4 w-full max-w-2xl">
                <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">

                    <!-- Encabezado (siempre igual) -->
                    <div
                        class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            {{ title }}
                        </h3>
                        <button @click="$emit('close')" type="button"
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>

                    <!-- Contenido (aquí se inyectará el formulario específico) -->
                    <form @submit.prevent="$emit('save')">
                        <div class="p-4 md:p-5 space-y-4">
                            <!-- El contenido del formulario del componente padre irá aquí -->
                            <slot name="body"></slot>
                        </div>

                        <!-- Pie de página (siempre igual) -->
                        <div
                            class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button type="submit"
                                class="text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Guardar
                            </button>
                            <button @click="$emit('close')" type="button"
                                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Cancelar
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
defineProps<{
    isOpen: boolean;
    title: string;
}>();

defineEmits(['close', 'save']);
</script>

<style scoped>
/* Transición para que el modal aparezca y desaparezca suavemente */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>