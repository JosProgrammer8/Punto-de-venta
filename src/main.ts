import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useUserStore } from './stores/userStore';
import './assets/main.css';

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.currentUser) {
    next({ path: '/login', query: { redirect: to.fullPath } });
  } else {
    next(); 
  }
});

app.use(router);
app.mount('#app');

