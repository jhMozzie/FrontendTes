import type { RouteRecordRaw } from 'vue-router';
import AcademiesView from './views/AcademiesView.vue'; // Asumimos que este es el nombre de la vista

const academyRoutes: RouteRecordRaw[] = [
  {
    path: 'academies',
    name: 'AcademiesList',
    component: AcademiesView,
  }
];

export default academyRoutes;
