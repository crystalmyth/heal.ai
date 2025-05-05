import { defineStore } from 'pinia'

export const useUserStore = defineStore('user-store', {
  state: () => ({ 
    user: {},
    users: [],
    modal: {
      type: 'Create',
      active: false
    }
  }),
  actions: {
    setUser(data) {
      this.user = {
        ...data,
        gender: { label: Object.entries(GENDER).find(([label, value]) => value === data.gender)[0], value: data.gender },
        activityLevel: data.activityLevel ? { label: data.activityLevel.levelName, value: data.activityLevel.id } : null,
        dietaryPreference: data.dietaryPreference ? { label: data.dietaryPreference.preferenceName, value: data.dietaryPreference.id } : null,
        primaryGoal: data.primaryGoal ? { label: data.primaryGoal.goalName, value: data.primaryGoal.id } : null,
        dietaryRestriction: null,
        currentChallenges: null,
      };
    },
    async fetchUser() {
      const { API_URL } = useRuntimeConfig().public
      try {
        const { data, error } = await useFetch(`${API_URL}/user/profile`, {
          method: 'get',
          headers: {
            'Authorization':  `Bearer ${useAuthStore().token}`
          }
        })
  
        if(error.value) {
          console.error(error.value)
          return
        }
        this.setUser(data.value)
      } catch (err) {
        if(err.response.status === 404) {
          this.$notify({
            type: 'negative',
            message: err.data.error
          })
        }
      }
    },

    async update() {
      const { API_URL } = useRuntimeConfig().public
      const { startLoading, stopLoading } = useLoaderStore();
      try {
        startLoading()
        const data = await $fetch(`${API_URL}/user/profile`, {
          method: 'put',
          body: {
            name: this.user.name,
            gender: this.user.gender.value,
            age: this.user.age,
            height_cm: this.user.height_cm,
            weight_kg: this.user.weight_kg,
            activityLevel: this.user.activityLevel.value || null,
            dietaryPreference: this.user.dietaryPreference.value || null,
            primaryGoal: this.user.primaryGoal.value || null
          },
          headers: {
            'Authorization': `Bearer ${useAuthStore().token}`
          }
        })

        this.$notify({
          type: 'positive',
          message: 'Profile updated successfully'
        })
      } catch (err) {
        if(err.response.status === 400) {
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
    activity_levels: (state) => state.user?.activityLevels?.map(l => ({label: l.levelName, value: l.id})) || [],
    dietary_preferences: (state) => state.user?.dietaryPreferences?.map(d => ({label: d.preferenceName, value: d.id})) || [],
    primary_goals: (state) => state.user?.primaryGoals?.map(p => ({label: p.goalName, value: p.id})) || [],
  }
})
