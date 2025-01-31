import { defineStore } from "pinia"
import type { Entity } from '@/types/types'

export const amoStore = defineStore("amoStore", {
  state: () => ({
    entities: [] as Entity[]
  }),

  actions: {
    async createEntity(url: string) {
      try {
        const data = await $fetch<Entity>(`http://localhost:4000/api/amo/${url}`, { method: "POST" })

        if (data) {
          this.entities.push(data)
        } else {
          throw new Error("Ошибка: пустой ответ")
        }
      } catch (error) {
        throw new Error(`Ошибка: ${error}`)
      }
    },
  },

  getters: {
    getEntities: (state): Entity[] => state.entities
  }
});
