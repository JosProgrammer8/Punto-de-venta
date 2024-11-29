<template>
    <div>
      <Navbar />
      <div class="container mx-auto p-4 max-w-md">
        <h1 class="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Correo Electrónico</label>
            <input v-model="email" type="email" id="email" class="input input-bordered w-full" required />
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Contraseña</label>
            <input v-model="password" type="password" id="password" class="input input-bordered w-full" required />
          </div>
          <button type="submit" class="btn btn-primary w-full">Iniciar Sesión</button>
        </form>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default defineComponent({
    components: { Navbar, Footer },
    setup() {
      const email = ref('');
      const password = ref('');
  
      function login() {
      }
  
      return { email, password, login };
    },
  });
  </script>
  
  <style scoped>
  </style>
  