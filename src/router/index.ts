import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductList from '../views/ProductList.vue';
import ProductDetail from '../views/ProductDetail.vue';
import PurchaseHistory from '../views/PurchaseHistory.vue';
import Login from '../views/Login.vue';
import AdminPanel from '../views/AdminPanel.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: ProductList },
  { path: '/products/:id', component: ProductDetail, props: true },
  { path: '/history', component: PurchaseHistory },
  { path: '/login', component: Login },
  { path: '/admin', component: AdminPanel }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


