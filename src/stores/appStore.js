import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // GetView
    getResult: [],

    // InsertView
    insertResult: null,

  }),

  actions: {
    setGetResult(list) {
      this.getResult = list
    },

    setInsertResult(result) {
      this.insertResult = result
    }
  }
})
