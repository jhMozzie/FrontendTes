import { createRouter, createWebHistory } from 'vue-router';

// 1. Importa las rutas desde cada módulo
import championshipRoutes from '@/modules/championships/routes';
import dashboardRoutes from '@/modules/dashboards/routes';
import userRoutes from '@/modules/users/routes';
import academyRoutes from '@/modules/academies/routes';

// 2. Une todas las rutas en un solo array
const routes = [
  ...dashboardRoutes,
  ...championshipRoutes,
  ...userRoutes,
  ...academyRoutes,
  // ... aquí añadirías las rutas de futuros módulos (ej: ...studentRoutes)
];

// 3. Crea y exporta el router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
