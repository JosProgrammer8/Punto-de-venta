<template>
    <div>
      <Navbar />
      <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Historial de Compras</h1>
        <table class="table w-full">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="purchase in purchases" :key="purchase.id">
              <td>{{ purchase.productName }}</td>
              <td>{{ purchase.quantity }}</td>
              <td>{{ purchase.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted } from 'vue';
  import { usePurchaseStore } from '@/stores/purchaseStore';
  import Navbar from '@/components/Navbar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default defineComponent({
    components: { Navbar, Footer },
    setup() {
      const purchaseStore = usePurchaseStore();
  
      onMounted(() => {
        purchaseStore.fetchPurchases();
      });
  
      return { ...purchaseStore };
    },
  });
  </script>
  
  <style scoped>
  </style>
  