<template>
  <div id="app">
    <header class="navbar bg-base-300 p-4 shadow-lg">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">Punto de Venta</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1 space-x-4">
          <li v-if="isLoggedIn"><router-link to="/">Inicio</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/products">Productos</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/sales-history">Historial de Ventas</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/login">Iniciar Sesión</router-link></li>
          <li v-if="!isLoggedIn"><router-link to="/register">Registrarse</router-link></li>
          <li v-if="isLoggedIn"><button @click="logout" class="btn btn-error">Cerrar Sesión</button></li>
        </ul>
      </div>
    </header>
    <transition name="fade" mode="out-in">
      <p v-if="globalError" class="text-red-500 mt-4 absolute top-0 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg">{{ globalError }}</p>
    </transition>
    <main class="container mx-auto p-4">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { computed, provide, ref, watch } from 'vue';
import { useUserStore } from './stores/userStore';
import router from './router';

export default {
  setup() {
    const userStore = useUserStore();
    const globalError = ref('');

    provide('globalError', globalError);

    watch(
      () => userStore.currentUser,
      (newVal) => {
        if (!newVal && router.currentRoute.value.meta.requiresAuth) {
          globalError.value = 'Debes iniciar sesión para acceder a esta página.';
          router.push('/login');
        }
      }
    );

    return {
      isLoggedIn: computed(() => userStore.currentUser !== null),
      globalError,
      logout() {
        userStore.logoutUser();
        router.push('/login');
      },
    };
  },
};
</script>

<style scoped>
#app {
  font-family: 'Montserrat', sans-serif;
  position: relative;
}

.menu-horizontal li {
  margin-right: 10px;
}

.space-x-4 > :not(:last-child) {
  margin-right: 1rem;
}

.btn-error {
  background-color: #ff5722;
}

.btn-error:hover {
  background-color: #e64a19;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

