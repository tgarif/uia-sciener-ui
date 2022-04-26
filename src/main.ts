import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar, Notify } from 'quasar';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';

// Import Quasar css
import 'quasar/src/css/index.sass';

import '@assets/sass/index.sass';

import App from './App.vue';
import router from '@router/index.router';

const pinia = createPinia();
const myApp = createApp(App);

myApp.use(router);
myApp.use(pinia);

myApp.use(Quasar, {
  plugins: { Notify },
});

myApp.mount('#app');
