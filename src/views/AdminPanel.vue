<template>
    <div>
      <Navbar />
      <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Panel de Administración</h1>
        <button @click="showCreateForm = !showCreateForm" class="btn btn-secondary mb-4">
          {{ showCreateForm ? 'Ocultar' : 'Agregar Producto' }}
        </button>
        <div v-if="showCreateForm" class="mb-4">
          <form @submit.prevent="addProduct">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Nombre del Producto</label>
              <input v-model="newProduct.name" type="text" id="name" class="input input-bordered w-full" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="price">Precio</label>
              <input v-model="newProduct.price" type="number" id="price" class="input input-bordered w-full" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="stock">Stock</label>
              <input v-model="newProduct.stock" type="number" id="stock" class="input input-bordered w-full" required />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="imageUrl">URL de la Imagen</label>
              <input v-model="newProduct.imageUrl" type="text" id="imageUrl" class="input input-bordered w-full" required />
            </div>
            <button type="submit" class="btn btn-primary w-full">Agregar Producto</button>
          </form>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="product in products" :key="product.id" class="card shadow-lg">
            <figure><img :src="product.imageUrl" alt="Product Image" class="w-full h-48 object-cover" /></figure>
            <div class="card-body">
              <h2 class="card-title">{{ product.name }}</h2>
              <p>Precio: ${{ product.price }}</p>
              <p v-if="product.stock > 0" class="text-green-600">En stock: {{ product.stock }}</p>
              <p v-else class="text-red-600">Producto agotado</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Editar</button>
                <button class="btn btn-danger">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { useProductStore } from '@/stores/productStore';
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default defineComponent({
    components: { Navbar, Footer },
    setup() {
      const productStore = useProductStore();
      const showCreateForm = ref(false);
      const newProduct = ref({
        name: '',
        price: 0,
        stock: 0,
        imageUrl: '',
      });
  
      const addProduct = async () => {
        await productStore.addProduct(newProduct.value);
        newProduct.value = { name: '', price: 0, stock: 0, imageUrl: '' };
        showCreateForm.value = false;
      };
  
      return { ...productStore, showCreateForm, newProduct, addProduct };
    },
  });
  </script>
  
  <style scoped>
  /* Estilos adicionales */
  </style>
  