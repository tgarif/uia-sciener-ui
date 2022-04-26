import { defineStore } from 'pinia';

export const applicationStore = defineStore('application', {
  state: () => ({
    accessToken: localStorage.getItem('Access-Token') || '',
  }),
  getters: {
    getAccessToken: (state) => state.accessToken,
    hasAccessToken: (state) => !!state.accessToken,
  },
  actions: {
    setAccessToken(accessToken: string) {
      localStorage.setItem('Access-Token', accessToken);
      this.accessToken = accessToken;
    },
    removeAccessToken() {
      localStorage.removeItem('Access-Token');
    },
  },
});
