<template>
  <div class="product-view">
    <header class="header">
      <h1 class="text-3xl font-bold text-center my-4">Gestión de Productos</h1>
    </header>
    <main class="main-content">
      <section class="add-product-section">
        <h2 class="text-2xl font-semibold text-center my-4" v-if="!isEditing">Añadir Nuevo Producto</h2>
        <h2 class="text-2xl font-semibold text-center my-4" v-else>Editar Producto</h2>
        <form @submit.prevent="isEditing ? updateProduct() : addProduct()" class="form-control w-full max-w-xs mx-auto">
          <label for="name" class="label">
            <span class="label-text">Producto:</span>
          </label>
          <select v-model="currentProduct.name" class="select select-bordered w-full mb-4" :disabled="isEditing" required>
            <option v-for="product in predefinedProducts" :key="product.name" :value="product.name">
              {{ product.name }}
            </option>
          </select>

          <label for="stock" class="label">
            <span class="label-text">Stock:</span>
          </label>
          <input v-model="currentProduct.stock" type="number" id="stock" class="input input-bordered w-full mb-4" required />

          <button type="submit" class="btn btn-primary w-full">{{ isEditing ? 'Actualizar Producto' : 'Añadir Producto' }}</button>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router';
import { ref, onMounted } from 'vue';
import { io } from "socket.io-client";

const randomPrice = () => parseFloat((Math.random() * (10 - 1) + 1).toFixed(2)); 

const predefinedProducts = [
  { name: 'Manzana', price: randomPrice(), stock: 10 },
  { name: 'Banana', price: randomPrice(), stock: 15 },
  { name: 'Naranja', price: randomPrice(), stock: 8 },
  { name: 'Uvas', price: randomPrice(), stock: 12 },
  { name: 'Sandía', price: randomPrice(), stock: 5 }
];

export default {
  setup() {
    const currentProduct = ref({
      name: '',
      stock: 0,
    });
    const predefinedProductsList = ref(predefinedProducts);
    const isEditing = ref(false);
    const socket = io("http://localhost:3000");

    const addProduct = async () => {
      const selectedProduct = predefinedProductsList.value.find(p => p.name === currentProduct.value.name);
      if (selectedProduct) {
        const productToAdd = {
          ...selectedProduct,
          stock: currentProduct.value.stock,
        };
        try {
          await axios.post('http://localhost:3000/products', productToAdd);
          resetForm();
          socket.emit("productAddedOrUpdated");
          router.push('/');
        } catch (error) {
          console.error("Error adding product:", error);
        }
      }
    };

    const updateProduct = async () => {
      try {
        await axios.put(`http://localhost:3000/products/${currentProduct.value.id}`, currentProduct.value);
        resetForm();
        socket.emit("productAddedOrUpdated");
        router.push('/');
      } catch (error) {
        console.error("Error updating product:", error);
      }
    };

    const resetForm = () => {
      currentProduct.value = {
        name: '',
        stock: 0,
      };
      isEditing.value = false;
    };

    onMounted(() => {
      const productToEdit = JSON.parse(localStorage.getItem('productToEdit'));
      if (productToEdit) {
        currentProduct.value = productToEdit;
        isEditing.value = true;
        localStorage.removeItem('productToEdit');
      }
    });

    return {
      currentProduct,
      predefinedProductsList,
      isEditing,
      addProduct,
      updateProduct,
      resetForm
    };
  }
};
</script>

<style scoped>
.product-view {
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
.add-product-section {
  width: 100%;
}
</style>
