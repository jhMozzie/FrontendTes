import type { RouteRecordRaw } from 'vue-router';
import StudentsView from './views/StudentsView.vue'; // Asumimos que este es el nombre de la vista

const studentRoutes: RouteRecordRaw[] = [
  {
    path: 'students',
    name: 'StudentsList',
    component: StudentsView,
  }
];

export default studentRoutes;
