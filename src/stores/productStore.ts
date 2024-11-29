import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', () => {
  const products = ref([]);
  const outOfStockProducts = computed(() => products.value.filter(product => product.stock === 0));

  async function fetchProducts() {
    try {
      const response = await axios.get('http://localhost:3000/products');
      products.value = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async function addProduct(product) {
    try {
      const response = await axios.post('http://localhost:3000/products', product);
      products.value.push(response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }

  async function updateProduct(updatedProduct) {
    try {
      const response = await axios.put(`http://localhost:3000/products/${updatedProduct.id}`, updatedProduct);
      const index = products.value.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        products.value[index] = response.data;
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  async function deleteProduct(productId) {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`);
      products.value = products.value.filter(product => product.id !== productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  return { products, outOfStockProducts, fetchProducts, addProduct, updateProduct, deleteProduct };
});
