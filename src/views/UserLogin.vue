<template>
  <div class="form-container flex flex-col items-center bg-base-100 p-10 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-6">Iniciar Sesión</h1>
    <form class="form-control w-full max-w-xs" @submit.prevent="login">
      <label class="label" for="email">
        <span class="label-text">Correo:</span>
      </label>
      <input v-model="email" type="email" id="email" required class="input input-bordered w-full mb-4" />

      <label class="label" for="password">
        <span class="label-text">Contraseña:</span>
      </label>
      <input v-model="password" type="password" id="password" required class="input input-bordered w-full mb-4" />

      <p class="mb-4">¿No tienes cuenta? <router-link to="/register" class="text-blue-500">Regístrate</router-link></p>

      <button type="submit" class="btn btn-primary w-full">Iniciar Sesión</button>
    </form>
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore';
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const userStore = useUserStore();
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const globalError = inject('globalError');
    const router = useRouter();

    userStore.loadUsersFromStorage();

    const login = () => {
      if (!email.value || !password.value) {
        globalError.value = 'Por favor, ingresa todos los datos.';
        setTimeout(() => {
          globalError.value = '';
        }, 3000);
        return;
      }
      if (userStore.loginUser(email.value, password.value)) {
        router.push('/'); 
      } else {
        globalError.value = 'Usuario no encontrado o contraseña incorrecta';
        setTimeout(() => {
          globalError.value = '';
        }, 3000);
      }
    };

    return {
      email,
      password,
      error,
      login,
    };
  },
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: auto;
}
</style>

