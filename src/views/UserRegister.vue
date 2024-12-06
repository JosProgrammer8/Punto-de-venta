<template>
  <div class="form-container flex flex-col items-center bg-base-100 p-10 rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold mb-6">Registro</h1>
    <form class="form-control w-full max-w-xs" @submit.prevent="register">
      <label class="label" for="name">
        <span class="label-text">Nombre:</span>
      </label>
      <input v-model="name" type="text" id="name" required class="input input-bordered w-full mb-4" />

      <label class="label" for="email">
        <span class="label-text">Correo:</span>
      </label>
      <input v-model="email" type="email" id="email" required class="input input-bordered w-full mb-4" />

      <label class="label" for="password">
        <span class="label-text">Contraseña:</span>
      </label>
      <input v-model="password" type="password" id="password" required class="input input-bordered w-full mb-4" />

      <p class="mb-4">¿Ya tienes cuenta? <router-link to="/login" class="text-blue-500">Inicia Sesión</router-link></p>

      <button type="submit" class="btn btn-primary w-full">Registrar</button>
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
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const globalError = inject('globalError');
    const router = useRouter();

    const register = () => {
      if (!name.value || !email.value || !password.value) {
        globalError.value = 'Por favor, ingresa todos los datos.';
        setTimeout(() => {
          globalError.value = '';
        }, 3000);
        return;
      }
      const newUser = {
        name: name.value,
        email: email.value,
        password: password.value,
      };
      userStore.registerUser(newUser);
      router.push('/login');
    };

    return {
      name,
      email,
      password,
      error,
      register,
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
