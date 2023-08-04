import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupStore } from './store';

import './styles/index.scss';
import 'virtual:uno.css';

// svg
import 'virtual:svg-icons-register';

const setupAll = async () => {
  const app = createApp(App);
  setupRouter(app);
  setupStore(app);
  await router.isReady();
  app.mount('#app');
};

setupAll();
