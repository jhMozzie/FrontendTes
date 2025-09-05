import type { RouteRecordRaw } from 'vue-router';
import UsersView from './views/UsersView.vue'; // Asumimos que este es el nombre de la vista

const userRoutes: RouteRecordRaw[] = [
  {
    path: 'users',
    name: 'UsersList',
    component: UsersView,
  }
];

export default userRoutes;
