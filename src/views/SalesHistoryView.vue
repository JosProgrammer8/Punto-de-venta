<template>
  <div class="sales-history-view">
    <header class="header">
      <h1 class="text-3xl font-bold text-center my-4">Historial de Ventas</h1>
    </header>
    <main class="main-content">
      <section class="sales-section">
        <h2 class="text-2xl font-semibold text-center my-4">Ventas Realizadas</h2>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Fecha</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sale in sales" :key="sale.id">
                <td>{{ sale.productName }}</td>
                <td>{{ formatDate(sale.date) }}</td>
                <td>{{ sale.quantity }}</td>
                <td>\${{ sale.total.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { io } from 'socket.io-client';

export default {
  setup() {
    const sales = ref([]);
    const socket = io("http://localhost:3000");

    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:3000/purchases');
        sales.value = response.data;
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    onMounted(() => {
      fetchSales();
      socket.on("salesUpdated", (updatedSales) => {
        sales.value = updatedSales;
      });
    });

    return {
      sales,
      formatDate
    };
  }
};
</script>

<style scoped>
.sales-history-view {
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
.sales-section {
  width: 100%;
}
.table {
  margin: auto;
  text-align: left;
}
</style>

  