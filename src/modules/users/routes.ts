import type { RouteRecordRaw } from 'vue-router';
import UsersView from './views/UsersView.vue'; // Asumimos que este es el nombre de la vista

const userRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    name: 'UsersList',
    component: UsersView,
    meta: { roles: ['admin', 'usuario', 'coach'] }, // ✅ todos pueden ver lista
  }
];

export default userRoutes;
