import { defineStore } from 'pinia';

const useUserStore = defineStore('user', {
  state: () => ({
    avatar: '',
  }),
});

export default useUserStore;
