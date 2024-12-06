import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ProductView from '@/views/ProductView.vue';
import SalesHistoryView from '@/views/SalesHistoryView.vue';
import UserLogin from '@/views/UserLogin.vue';
import UserRegister from '@/views/UserRegister.vue';
import AdminDashboard from '@/views/AdminDashboard.vue';
import UnauthorizedView from '@/views/UnauthorizedView.vue';
import { useUserStore } from '../stores/userStore';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/products', name: 'Products', component: ProductView },
  { path: '/sales-history', name: 'SalesHistory', component: SalesHistoryView },
  { path: '/login', name: 'Login', component: UserLogin },
  { path: '/register', name: 'Register', component: UserRegister },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: UnauthorizedView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const publicPages = ['/login', '/register'];
  const authRequired = to.meta.requiresAuth;
  const adminRequired = to.meta.requiresAdmin;
  const currentUser = userStore.currentUser;

  if (authRequired && !currentUser) {
    return next('/login');
  }

  if (adminRequired) {
    const isAdmin =
      currentUser &&
      currentUser.email === 'admin@admin.com' &&
      currentUser.password === 'enrique88';
    if (!isAdmin) {
      return next('/unauthorized');
    }
  }

  next();
});

export default router;

