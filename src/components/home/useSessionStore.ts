import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSessionStore = defineStore(
  'session',
  () => {
    const isActiveSession = ref(false)

    return {
      isActiveSession
    }
  },
  {
    persist: true
  }
)
