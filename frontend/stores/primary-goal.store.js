import { defineStore } from 'pinia'

export const usePrimaryGoalStore = defineStore('primary-goal-store', {
  state: () => ({
    primaryGoals: [],
    primaryGoal: {
      id: null,
      goalName: null
    },
    deleteDialog: false,
    deletePrimaryGoal: {
      id: null,
      goalName: null
    },
  }),
  actions: {
    reset() {
      this.primaryGoal = {
        id: null,
        goalName: null
      }
      this.deletePrimaryGoal = {
        id: null,
        goalName: null
      }
    },

    async fetchAll() {
      try {
        const { API_URL } = useRuntimeConfig().public
        const { data, error } = await useFetch(`${API_URL}/primary-goal`, {
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
        this.primaryGoals = data.value
      } catch (err) {
        console.error(`error in fetching all primary goals`, err)
      }
    },

    async create() {
      const { API_URL } = useRuntimeConfig().public
      try {
        const data = await $fetch(`${API_URL}/primary-goal`, {
          method: 'post',
          body: { goalName: this.primaryGoal.goalName },
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`,
          },
          responseType: 'json'
        })

        this.primaryGoals = data
        this.$notify({
          type: 'positive',
          message: 'Primary Goal created successfully'
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
      }
    },

    editRow(data) {
      this.primaryGoal = { ...data }
    },
    deleteRow(data) {
      this.deletePrimaryGoal = { ...data }
      this.deleteDialog = true
    },

    async update() {
      const { API_URL } = useRuntimeConfig().public
      try {
        const data = await $fetch(`${API_URL}/primary-goal/${this.primaryGoal.id}`, {
          method: 'put',
          body: { goalName: this.primaryGoal.goalName },
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`
          },
          responseType: 'json'
        })
        
        this.primaryGoals = data
        this.$notify({
          type: 'positive',
          message: 'Primary Goal updated successfully'
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
      }
    },

    async destroy() {
      const { API_URL } = useRuntimeConfig().public
      try {
        const data = await $fetch(`${API_URL}/primary-goal/${this.deletePrimaryGoal.id}`, {
          method: 'delete',
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`
          },
          responseType: 'json'
        })
        this.primaryGoals = data
        this.$notify({
          type: 'positive',
          message: 'Primary Goal deleted successfully'
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
      }
    }
  },

  getters: {
    columns: () => [
      { name: 'goalName', align: 'left', label: 'Goal Name', field: 'goalName' },
      { name: 'actions', align: 'right', label: '', field: 'actions' },
    ],
    getPrimaryGoals: (state) => state.primaryGoals
  }
})
