import { createApp } from 'vue';
import App from './App.vue';
import naive from './common/naive';
import router from './router';
import store from './store';
// import 'tailwindcss/tailwind.css';
import '@/assets/css/reset.css';

createApp(App).use(store).use(router).use(naive).mount('#app');
