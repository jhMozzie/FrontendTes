import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'; // Importar el enrutador
import './style.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router); // Usar el enrutador
app.mount('#app');