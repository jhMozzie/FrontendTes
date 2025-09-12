import type { RouteRecordRaw } from 'vue-router';
import DetailLayout from '@/layouts/DetailLayout.vue'; 

// VISTAS - CORREGIR LOS NOMBRES (agregar la "s")
import ChampionshipsListView from './views/ChampionshipsListView.vue';
import ChampionshipsParticipants from './views/detail/ChampionshipsParticipants.vue';
import ChampionshipsCategories from './views/detail/ChampionshipsCategories.vue';
import ChampionshipsBrackets from './views/detail/ChampionshipsBrackets.vue';

const championshipRoutes: RouteRecordRaw[] = [
  {
    path: 'championships',
    name: 'ChampionshipsList',
    component: ChampionshipsListView,
  },
  {
    path: '/championships/:id',
    component: DetailLayout,
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
        component: ChampionshipsParticipants, // ← Corregido
      },
      {
        path: 'categories',
        name: 'ChampionshipDetailCategories',
        component: ChampionshipsCategories, // ← Corregido
      },
      {
        path: 'brackets',
        name: 'ChampionshipDetailBrackets',
        component: ChampionshipsBrackets, // ← Corregido
      },
      {
        path: '',
        redirect: { name: 'ChampionshipDetailParticipants' },
      },
    ],
  },
];

export default championshipRoutes;