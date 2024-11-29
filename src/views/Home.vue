<template>
    <div>
      <Navbar />
      <div class="container mx-auto p-4 pt-20"> <!-- Añade pt-20 para el margen superior -->
        <h1 class="text-4xl font-bold text-center mb-8">Bienvenido a Punto de Venta</h1>
        <div class="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <router-link to="/products" class="btn btn-primary btn-lg">Ver Productos</router-link>
          <router-link to="/login" class="btn btn-secondary btn-lg">Iniciar Sesión</router-link>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'Home',
    components: {
      Navbar,
      Footer,
    },
  };
  </script>
  
  <style scoped>
  </style>
  