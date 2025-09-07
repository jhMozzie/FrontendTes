import type { RouteRecordRaw } from 'vue-router';

// 1. IMPORTAMOS EL LAYOUT GENÉRICO
import DetailLayout from '@/layouts/DetailLayout.vue'; 

// VISTAS
import ChampionshipsListView from './views/ChampionshipsListView.vue';
import ChampionshipParticipants from './views/detail/ChampionshipParticipants.vue';
import ChampionshipCategories from './views/detail/ChampionshipCategories.vue';
import ChampionshipBrackets from './views/detail/ChampionshipBrackets.vue';

const championshipRoutes: RouteRecordRaw[] = [
  {
    path: 'championships',
    name: 'ChampionshipsList',
    component: ChampionshipsListView,
  },
  {
    path: '/championships/:id',
    // 2. USAMOS EL LAYOUT GENÉRICO
    component: DetailLayout,
    // 3. LE PASAMOS LAS PROPS CON LA CONFIGURACIÓN PARA ESTE MÓDULO
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
        component: ChampionshipParticipants,
      },
      {
        path: 'categories',
        name: 'ChampionshipDetailCategories',
        component: ChampionshipCategories,
      },
      {
        path: 'brackets',
        name: 'ChampionshipDetailBrackets',
        component: ChampionshipBrackets,
      },
      {
        path: '',
        redirect: { name: 'ChampionshipDetailParticipants' },
      },
    ],
  },
];

export default championshipRoutes;

