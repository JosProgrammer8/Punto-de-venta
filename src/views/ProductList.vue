<template>
    <div>
      <Navbar />
      <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Productos</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="product in products" :key="product.id" class="card shadow-lg">
            <figure><img :src="product.imageUrl" alt="Producto" class="w-full h-48 object-cover"/></figure>
            <div class="card-body">
              <h2 class="card-title">{{ product.name }}</h2>
              <p>Precio: ${{ product.price }}</p>
              <p v-if="product.stock > 0" class="text-green-600">En stock: {{ product.stock }}</p>
              <p v-else class="text-red-600">Producto agotado</p>
              <div class="card-actions justify-end">
                <router-link :to="`/products/${product.id}`" class="btn btn-primary">Ver detalles</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted } from 'vue';
  import { useProductStore } from '@/stores/productStore';
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default defineComponent({
    components: { Navbar, Footer },
    setup() {
      const productStore = useProductStore();
  
      onMounted(() => {
        productStore.fetchProducts();
      });
  
      return { ...productStore };
    },
  });
  </script>
  
  <style scoped>
  </style>
  
  