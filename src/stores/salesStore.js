import { defineStore } from 'pinia';

export const useSalesStore = defineStore('salesStore', {
  state: () => ({
    sales: [], 
  }),
  actions: {
    loadSales() {
      const sales = localStorage.getItem('sales');
      this.sales = sales ? JSON.parse(sales) : [];
    },
    saveSalesToStorage() {
      localStorage.setItem('sales', JSON.stringify(this.sales));
    },
    addSale(sale) {
      this.sales.push(sale);
      this.saveSalesToStorage();
    },
    recordSale(sale) {
      this.addSale(sale);
    }
  },
});
