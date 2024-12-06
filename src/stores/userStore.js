import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
  }),
  actions: {
    loadUsersFromStorage() {
      const users = localStorage.getItem('users');
      this.users = users ? JSON.parse(users) : []; 
    },
    saveUsersToStorage() {
      localStorage.setItem('users', JSON.stringify(this.users));
    },
    registerUser(user) {
      this.users.push(user);
      this.saveUsersToStorage();
    },
    loginUser(email, password) {
      const user = this.users.find(u => u.email === email && u.password === password);
      if (user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
      return false;
    },
    logoutUser() {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
    },
  },
});


