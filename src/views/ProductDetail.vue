<template>
    <div>
      <Navbar />
      <div class="container mx-auto p-4">
        <img :src="product.imageUrl" alt="Product Image" class="w-full h-64 object-cover rounded-lg shadow-lg">
        <div class="mt-4">
          <h1 class="text-3xl font-bold">{{ product.name }}</h1>
          <p class="text-lg text-gray-700">Precio: ${{ product.price }}</p>
          <p class="text-gray-600 mt-2" v-if="product.stock > 0">En stock: {{ product.stock }}</p>
          <p class="text-red-600 mt-2" v-else>Producto agotado</p>
          <router-link to="/products" class="btn btn-secondary mt-4">Volver a productos</router-link>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import { defineComponent, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useProductStore } from '@/stores/productStore';
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default defineComponent({
    components: { Navbar, Footer },
    setup() {
      const route = useRoute();
      const productStore = useProductStore();
  
      const product = computed(() => productStore.products.find(p => p.id === Number(route.params.id)));
  
      return { product };
    },
  });
  </script>
  
  <style scoped>
  </style>
  