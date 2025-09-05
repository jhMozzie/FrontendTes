import type { RouteRecordRaw } from 'vue-router';

// LAYOUTS
import ChampionshipDetailLayout from '@/layouts/ChampionshipDetailLayout.vue';

// VISTAS
import ChampionshipsListView from './views/ChampionshipsListView.vue';
import ChampionshipParticipants from './views/detail/ChampionshipParticipants.vue';
import ChampionshipCategories from './views/detail/ChampionshipCategories.vue';
import ChampionshipBrackets from './views/detail/ChampionshipBrackets.vue';

const championshipRoutes: RouteRecordRaw[] = [
  // 1. Ruta para la lista principal (ya la tienes)
  {
    path: 'championships',
    name: 'ChampionshipsList',
    component: ChampionshipsListView,
  },
  // 2. Ruta padre para la vista de detalle anidada
  {
    path: '/championships/:id',
    component: ChampionshipDetailLayout, // Usa el layout con el sidebar secundario
    children: [
      {
        path: 'participants', // URL -> /championships/:id/participants
        name: 'ChampionshipDetailParticipants',
        component: ChampionshipParticipants,
      },
      {
        path: 'categories', // URL -> /championships/:id/categories
        name: 'ChampionshipDetailCategories',
        component: ChampionshipCategories,
      },
      {
        path: 'brackets', // URL -> /championships/:id/brackets
        name: 'ChampionshipDetailBrackets',
        component: ChampionshipBrackets,
      },
      // Redirección por defecto: al entrar a /championships/:id, te manda a 'participants'
      {
        path: '',
        redirect: { name: 'ChampionshipDetailParticipants' },
      },
    ],
  },
];

export default championshipRoutes;

