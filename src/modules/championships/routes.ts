import ChampionshipsView from './views/ChampionshipsView.vue';

// La clave es usar "export default" para que el router principal pueda importarlo
export default [
  {
    path: '/championships',
    name: 'Championships',
    component: ChampionshipsView,
  },
];
