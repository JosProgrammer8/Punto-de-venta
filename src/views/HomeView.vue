<template>
  <div class="home-view">
    <header class="header">
      <h1 class="text-3xl font-bold text-center my-4">Bienvenido al Punto de Venta</h1>
    </header>
    <main class="main-content">
      <section class="products-section">
        <h2 class="text-2xl font-semibold text-center my-4">Nuestros Productos</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="product in products" :key="product.id" class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
              <h3 class="card-title">{{ product.name }}</h3>
              <p class="text-xl font-semibold text-green-500">\${{ product.price.toFixed(2) }}</p>
              <p class="text-sm" :class="{ 'text-red-500': product.stock === 0 }">Stock: {{ product.stock }}</p>
              <p v-if="product.stock === 0" class="text-red-500 font-bold">¡Producto agotado!</p>
              <div class="card-actions justify-end">
                <button @click="editProduct(product)" class="btn btn-secondary">Editar</button>
                <button @click="deleteProduct(product.id)" class="btn btn-error">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router';
import { ref, onMounted } from 'vue';
import { io } from "socket.io-client";

export default {
  setup() {
    const products = ref([]);
    const socket = io("http://localhost:3000");

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        products.value = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    onMounted(() => {
      fetchProducts();
      socket.on("productsUpdated", (updatedProducts) => {
        products.value = updatedProducts;
      });
    });

    const deleteProduct = async (productId) => {
      try {
        await axios.delete(`http://localhost:3000/products/${productId}`);
        products.value = products.value.filter(product => product.id !== productId);
        socket.emit("productDeleted", products.value);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };

    const editProduct = (product) => {
      localStorage.setItem('productToEdit', JSON.stringify(product));
      router.push('/products'); 
    };

    return {
      products,
      deleteProduct,
      editProduct
    };
  }
};
</script>

<style scoped>
.home-view {
  font-family: 'Montserrat', sans-serif;
  color: #ccc;
  padding: 20px;
}
.header {
  text-align: center;
  margin-bottom: 20px;
}
.main-content {
  display: flex;
  justify-content: center;
}
.products-section {
  width: 100%;
}
.card-actions .btn-disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>


