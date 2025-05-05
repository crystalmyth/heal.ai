import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader-store', {
  state: () => ({ 
    count: 0
  }),
  actions: {
    startLoading() {
      this.count++
    },
    stopLoading() {
      if(this.count > 0) this.count--
    },
  },
  getters: {
    isLoading: (state) => state.count > 0
  }
})