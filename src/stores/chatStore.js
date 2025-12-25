import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: []
  }),

  actions: {
    addMessage(msg) {
      this.messages.push(msg)
    }
  }
})
    

    







    

    