import { defineStore } from 'pinia'

export const useActivityLevelStore = defineStore('activity-level-store', {
  state: () => ({
    activityLevels: [],
    activityLevel: {
      id: null,
      levelName: null
    },
    deleteDialog: false,
    deleteActivityLevel: {
      id: null,
      levelName: null
    },
  }),
  actions: {
    reset() {
      this.activityLevel = {
        id: null,
        levelName: null
      }
      this.deleteActivityLevel = {
        id: null,
        levelName: null
      }
    },

    async fetchAll() {
      try {
        const { API_URL } = useRuntimeConfig().public
        const { data, error } = await useFetch(`${API_URL}/activity-level`, {
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
        this.activityLevels = data.value
      } catch (err) {
        console.error(`error in fetching all activity levels`, err)
      }
    },

    async create() {
      const { API_URL } = useRuntimeConfig().public
      const { startLoading, stopLoading } = useLoaderStore()
      try {
        startLoading()
        const data = await $fetch(`${API_URL}/activity-level`, {
          method: 'post',
          body: { levelName: this.activityLevel.levelName },
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`,
          },
          responseType: 'json'
        })

        this.activityLevels = data
        this.$notify({
          type: 'positive',
          message: 'Activity Level created successfully'
        })
        this.reset()

      } catch (err) {
        if ([500, 400].includes(err.response.status)) {
          this.$notify({
            type: 'negative',
            message: err.data.error
          })
        }
      } finally {
        stopLoading()
      }
    },

    editRow(data) {
      this.activityLevel = { ...data }
    },
    deleteRow(data) {
      this.deleteActivityLevel = { ...data }
      this.deleteDialog = true
    },

    async update() {
      const { API_URL } = useRuntimeConfig().public
      const { startLoading, stopLoading } = useLoaderStore()
      try {
        startLoading()
        const data = await $fetch(`${API_URL}/activity-level/${this.activityLevel.id}`, {
          method: 'put',
          body: { levelName: this.activityLevel.levelName },
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`
          },
          responseType: 'json'
        })
        
        this.activityLevels = data
        this.$notify({
          type: 'positive',
          message: 'Activity Level updated successfully'
        })

        this.reset()

      } catch (err) {
        if ([500, 400].includes(err.response.status)) {
          this.$notify({
            type: 'negative',
            message: err.data.error
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
        const data = await $fetch(`${API_URL}/activity-level/${this.deleteActivityLevel.id}`, {
          method: 'delete',
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`
          },
          responseType: 'json'
        })
        this.activityLevels = data
        this.$notify({
          type: 'positive',
          message: 'Activity Level deleted successfully'
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
      { name: 'levelName', align: 'left', label: 'Level Name', field: 'levelName' },
      { name: 'actions', align: 'right', label: '', field: 'actions' },
    ],
    getActivityLevels: (state) => state.activityLevels
  }
})
