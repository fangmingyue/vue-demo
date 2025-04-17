import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('counter', () => {
  const count = ref(0)

  return { count }
})
