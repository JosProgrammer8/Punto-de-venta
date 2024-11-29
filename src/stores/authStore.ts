import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(null);

  const isLoggedIn = computed(() => !!user.value);

  async function login(username: string, password: string) {
    try {
      const response = await axios.post('http://localhost:3000/login', { username, password });
      token.value = response.data.token;
      const userDetails = JSON.parse(atob(token.value.split('.')[1]));
      user.value = userDetails;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
    delete axios.defaults.headers.common['Authorization'];
  }

  async function register(username: string, password: string, role: string) {
    try {
      await axios.post('http://localhost:3000/register', { username, password, role });
    } catch (error) {
      console.error('Error registering:', error);
    }
  }

  return { user, token, isLoggedIn, login, logout, register };
});
