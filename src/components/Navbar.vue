<template>
  <div class="navbar bg-green-600 text-white shadow-md fixed top-0 left-0 right-0">
    <div class="flex-1">
      <router-link to="/" class="btn btn-ghost normal-case text-xl text-white">Punto de Venta</router-link>
    </div>
    <div class="flex-none">
      <router-link to="/products" class="btn btn-ghost text-white">Productos</router-link>
      <div v-if="isAdmin" class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost text-white">Admin</div>
        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-green-600 rounded-box w-52 mt-3">
          <li><router-link to="/admin" class="text-white">Panel de Administración</router-link></li>
        </ul>
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span class="badge badge-sm indicator-item bg-red-500 text-white">8</span>
          </div>
        </div>
        <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
          <div class="card-body">
            <span class="text-lg font-bold">8 Items</span>
            <span class="text-info">Subtotal: $999</span>
            <div class="card-actions">
              <button class="btn btn-primary btn-block">Ver carrito</button>
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Usuario" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
          </div>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-green-600 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><router-link to="/profile" class="text-white">Perfil</router-link></li>
          <li><router-link to="/settings" class="text-white">Configuraciones</router-link></li>
          <li><a @click="logout" class="text-white">Cerrar sesión</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const authStore = useAuthStore();
    const isAdmin = computed(() => authStore.user?.role === 'admin');

    function logout() {
      authStore.logout();
    }

    return { isAdmin, logout };
  }
});
</script>

<style scoped>
</style>
