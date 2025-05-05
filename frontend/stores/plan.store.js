import { defineStore } from 'pinia'
import { is } from 'quasar';

export const usePlanStore = defineStore('plan-store', {
  persist: true,
  state: () => ({ 
    workoutPlan: {},
    dietPlan: {},
    motivationAdvise: {}
  }),
  actions: {
    async fetchWorkoutPlan() {
      const { API_URL } = useRuntimeConfig().public
      const { user } = useUserStore();
      const { startLoading, stopLoading } = useLoaderStore();
      try {
        startLoading()
        const data = await $fetch(`${API_URL}/workout-plan`, {
          method: 'post',
          body: {
            age: user.age,
            height_cm: user.height_cm,
            weight_kg: user.weight_kg,
            goal: user.primaryGoal?.value ? user.primaryGoal.value : user.primaryGoal
          },
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`
          },
          responseType: 'json'
        })
        this.workoutPlan = data
        this.$notify({
          type: 'positive',
          message: 'Workout Plan generated successfully'
        })
      } catch (err) {
        if([400, 500].includes(err.response.status)) {
          this.$notify({
            type: 'negative',
            message: err.data.error
          })
        }
      } finally {
        stopLoading()
      }
    },

    async fetchDietPlan() {
      const { API_URL } = useRuntimeConfig().public
      const { user } = useUserStore();
      const { startLoading, stopLoading } = useLoaderStore();
      try {
        startLoading()
        const data = await $fetch(`${API_URL}/diet-plan`, {
          method: 'post',
          body: {
            age: user.age,
            height_cm: user.height_cm,
            weight_kg: user.weight_kg,
            activityLevel: user.activityLevel?.value ? user.activityLevel.value : user.activityLevel,
            dietaryPreference: user.dietaryPreference?.value ? user.dietaryPreference.value : user.dietaryPreference,
            dietaryRestriction: user.dietaryRestriction
          },
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`
          },
          responseType: 'json'
        })
        this.dietPlan = data
        this.$notify({
          type: 'positive',
          message: 'Diet Plan generated successfully'
        })
      } catch (err) {
        if([500, 400].includes(err.status)) {
          this.$notify({
            type: 'negative',
            message: err.data.error
          })
        }
      } finally {
        stopLoading()
      }
    },
    
    async fetchMotivationAdvise() {
      const { API_URL } = useRuntimeConfig().public
      const { user } = useUserStore()
      const { startLoading, stopLoading } = useLoaderStore();
      try {
        startLoading()
        const data = await $fetch(`${API_URL}/motivation-advise`, {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`
          },
          body: {
            activityLevel: user.activityLevel.value,
            primaryGoal: user.primaryGoal.value,
            currentChallenges: user.currentChallenges
          },
          responseType: 'json'
        })
        this.$notify({
          type: 'positive',
          message: 'Motivation Advise generated successfully'
        })
        this.motivationAdvise = data

      } catch (err) {
        if([500, 400].includes(err.response.status)) {
          this.$notify({
            type: 'negative',
            message: err.data.error
          })
        }
      } finally {
        stopLoading()
      }
    }
  },
  getters: {
    isWorkoutPlan: (state) => !!Object.keys(state.workoutPlan).length,
    isDietPlan: (state) => !!Object.keys(state.dietPlan).length,
    isMotivationAdvise: (state) => !!Object.keys(state.motivationAdvise).length
  }
})
