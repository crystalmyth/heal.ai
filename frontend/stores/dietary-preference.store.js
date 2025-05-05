import { defineStore } from 'pinia'

export const useDietaryPreferenceStore = defineStore('dietary-preference-store',{
  state: () => ({
    dietaryPreferences: [],
    dietaryPreference: {
      id: null,
      preferenceName: null
    },
    deleteDialog: false,
    deleteDietaryPreference: {
      id: null,
      preferenceName: null
    },
  }),
  actions: {
    reset() {
      this.dietaryPreference = {
        id: null,
        preferenceName: null
      }
      this.deleteDietaryPreference = {
        id: null,
        preferenceName: null
      }
    },

    async fetchAll() {
      try {
        const { API_URL } = useRuntimeConfig().public
        const { data, error } = await useFetch(`${API_URL}/dietary-preference`, {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`
          },
          responseType: 'json'
        })
        if (error.value) {
          console.error(error.value)
          return
        }
        this.dietaryPreferences = data.value
      } catch (err) {
        console.error(`error in fetching all dietary preferences`, err)
      }
    },

    async create() {
      const { startLoading, stopLoading } = useLoaderStore()
      const { API_URL } = useRuntimeConfig().public
      try {
        startLoading()
        const data = await $fetch(`${API_URL}/dietary-preference`, {
          method: 'post',
          body: { preferenceName: this.dietaryPreference.preferenceName },
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`,
          },
          responseType: 'json'
        })

        this.dietaryPreferences = data
        this.$notify({
          type: 'positive',
          message: 'dietary preference created successfully'
        })
        this.reset()

      } catch (err) {
        if (err.response.status === 400) {
          this.$notify({
            type: 'negative',
            message: err.data.error
          })
        }

        if (err.response.status === 500) {
          this.$notify({
            type: 'negative',
            message: 'Internal Server Error'
          })
        }
      } finally {
        stopLoading()
      }
    },

    editRow(data) {
      this.dietaryPreference = { ...data }
    },
    deleteRow(data) {
      this.deleteDietaryPreference = { ...data }
      this.deleteDialog = true
    },

    async update() {
      const { startLoading, stopLoading } = useLoaderStore()
      const { API_URL } = useRuntimeConfig().public
      try {
        startLoading()
        const data = await $fetch(`${API_URL}/dietary-preference/${this.dietaryPreference.id}`, {
          method: 'put',
          body: { preferenceName: this.dietaryPreference.preferenceName },
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`
          },
          responseType: 'json'
        })
        
        this.dietaryPreferences = data
        this.$notify({
          type: 'positive',
          message: 'dietary preference updated successfully'
        })

        this.reset()

      } catch (err) {
        if (err.response.status === 400) {
          this.$notify({
            type: 'negative',
            message: err.data.error
          })
        }

        if (err.response.status === 500) {
          this.$notify({
            type: 'negative',
            message: 'Internal Server Error'
          })
        }
      } finally {
        stopLoading()
      }
    },

    async destroy() {
      const { API_URL } = useRuntimeConfig().public
      const { startLoading, stopLoading } = useLoaderStore()
      try {
        startLoading()
        const data = await $fetch(`${API_URL}/dietary-preference/${this.deleteDietaryPreference.id}`, {
          method: 'delete',
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`
          },
          responseType: 'json'
        })
        this.dietaryPreferences = data
        this.$notify({
          type: 'positive',
          message: 'dietary preference deleted successfully'
        })

        this.reset()
        this.deleteDialog = false

      } catch (err) {
        if (err.response.status === 500) {
          this.$notify({
            type: 'negative',
            message: 'Internal Server Error'
          })
        }
      } finally {
        stopLoading()
      }
    }
  },

  getters: {
    columns: () => [
      { name: 'preferenceName', align: 'left', label: 'Preference Name', field: 'preferenceName' },
      { name: 'actions', align: 'right', label: '', field: 'actions' },
    ],
    getDietaryPreferences: (state) => state.dietaryPreferences
  }
})
