import { defineStore } from 'pinia';

const randomPrice = () => parseFloat((Math.random() * (10 - 1) + 1).toFixed(2));

const predefinedProducts = [
  { name: 'Manzana', price: randomPrice(), stock: 10 },
  { name: 'Platano', price: randomPrice(), stock: 15 },
  { name: 'Naranja', price: randomPrice(), stock: 8 },
  { name: 'Uvas', price: randomPrice(), stock: 12 },
  { name: 'Sandía', price: randomPrice(), stock: 5 }
];

export const useProductsStore = defineStore('productsStore', {
  state: () => ({
    products: [],
  }),
  actions: {
    loadProducts() {
      const products = localStorage.getItem('products');
      if (products) {
        this.products = JSON.parse(products).map(product => ({
          ...product,
          price: product.price || randomPrice(),
        }));
      } else {
        this.products = predefinedProducts;
        this.saveProductsToStorage();
      }
    },
    saveProductsToStorage() {
      localStorage.setItem('products', JSON.stringify(this.products));
    },
    addProduct(product) {
      this.products.push(product);
      this.saveProductsToStorage();
    },
    deleteProduct(productId) {
      this.products = this.products.filter(product => product.id !== productId);
      this.saveProductsToStorage();
    },
    updateProduct(updatedProduct) {
      const index = this.products.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = updatedProduct;
        this.saveProductsToStorage();
      }
    },
    setProducts(products) {
      this.products = products;
      this.saveProductsToStorage();
    },
    startEditProduct(product) {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.currentProduct = { ...this.products[index] };
        this.isEditing = true;
      }
    },
    buyProduct(product) {
      const productToUpdate = this.products.find(p => p.id === product.id);
      if (productToUpdate && productToUpdate.stock > 0) {
        productToUpdate.stock -= 1;
        this.saveProductsToStorage();
      }
    }
  },
});
