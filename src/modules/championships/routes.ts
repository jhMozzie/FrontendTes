import type { RouteRecordRaw } from 'vue-router';
import DetailLayout from '@/layouts/DetailLayout.vue'; 

// VISTAS
import ChampionshipsListView from './views/ChampionshipsListView.vue';
import ChampionshipsParticipants from './views/detail/ChampionshipsParticipants.vue';
import ChampionshipsCategories from './views/detail/ChampionshipsCategories.vue';
import ChampionshipsBrackets from './views/detail/ChampionshipsBrackets.vue';

const championshipRoutes: RouteRecordRaw[] = [
  {
    path: 'championships',
    name: 'ChampionshipsList',
    component: ChampionshipsListView,
    meta: { roles: ['admin', 'usuario', 'coach'] }, // ✅ todos pueden ver lista
  },
  {
    path: '/championships/:id',
    component: DetailLayout,
    meta: { roles: ['admin', 'usuario', 'coach'] }, // ✅ todos pueden ver detalle
    props: route => ({
      title: 'Gestionar Campeonato',
      backRoute: { name: 'ChampionshipsList' },
      navLinks: [
        { name: 'participants', to: { name: 'ChampionshipDetailParticipants', params: { id: route.params.id } }, label: 'Participantes', icon: '👥' },
        { name: 'categories', to: { name: 'ChampionshipDetailCategories', params: { id: route.params.id } }, label: 'Categorías', icon: '🏆' },
        { name: 'brackets', to: { name: 'ChampionshipDetailBrackets', params: { id: route.params.id } }, label: 'Llaves', icon: '📊' },
      ]
    }),
    children: [
      {
        path: 'participants',
        name: 'ChampionshipDetailParticipants',
        component: ChampionshipsParticipants,
        meta: { roles: ['admin', 'usuario', 'coach'] }, // 👈 Coach también
      },
      {
        path: 'categories',
        name: 'ChampionshipDetailCategories',
        component: ChampionshipsCategories,
        meta: { roles: ['admin', 'usuario'] }, // 👈 Coach no
      },
      {
        path: 'brackets',
        name: 'ChampionshipDetailBrackets',
        component: ChampionshipsBrackets,
        meta: { roles: ['admin', 'usuario'] }, // 👈 Coach no
      },
      {
        path: '',
        redirect: { name: 'ChampionshipDetailParticipants' },
      },
    ],
  },
];

export default championshipRoutes;