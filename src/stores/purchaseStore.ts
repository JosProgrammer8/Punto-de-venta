import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const usePurchaseStore = defineStore('purchase', () => {
  const purchases = ref([]);

  async function fetchPurchases() {
    try {
      const response = await axios.get('http://localhost:3000/purchases');
      purchases.value = response.data;
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  }

  async function addPurchase(purchase) {
    try {
      const response = await axios.post('http://localhost:3000/purchases', purchase);
      purchases.value.push(response.data);
    } catch (error) {
      console.error('Error adding purchase:', error);
    }
  }

  return { purchases, fetchPurchases, addPurchase };
});
