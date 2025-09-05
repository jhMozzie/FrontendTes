import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// --- LAYOUTS ---
import MainLayout from '@/layouts/MainLayout.vue';

// --- IMPORTAMOS LOS ARRAYS DE RUTAS DE CADA MÓDULO ---
import championshipRoutes from '@/modules/championships/routes';
import academyRoutes from '@/modules/academies/routes';
import studentRoutes from '@/modules/students/routes';
import userRoutes from '@/modules/users/routes';

// --- LÓGICA DE ENSAMBLAJE DE RUTAS ---

// 1. Rutas que van dentro del MainLayout (todas las vistas de lista)
const mainLayoutChildren: RouteRecordRaw[] = [
  ...championshipRoutes.filter(route => !route.path.startsWith('/')),
  ...academyRoutes,
  ...studentRoutes,
  ...userRoutes,
];

// 2. Rutas de nivel superior que usan su propio layout (como la de detalle)
const detailLayoutRoutes: RouteRecordRaw[] = [
  ...championshipRoutes.filter(route => route.path.startsWith('/')),
  // En el futuro, aquí podrías agregar otras rutas de detalle (ej. /students/:id)
];

// --- CONFIGURACIÓN FINAL DE RUTAS ---
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: mainLayoutChildren,
    redirect: '/championships', // Redirige la raíz a la lista de campeonatos por defecto
  },
  // Añadimos las rutas de detalle como rutas de nivel superior, independientes del MainLayout
  ...detailLayoutRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;