import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth-store', {
  persist: true,
  state: () => ({
    token: null,
    user: {
      name: null,
      email: null,
      password: null,
      samePassword: null
    }
  }),
  actions: {
    setUser(data) {
      this.user = {
        ...data,
        password: null,
        samePassword: null
      }
    },
    async login() {
      const { API_URL } = useRuntimeConfig().public
      const { user, token, error, message } = await $fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: {
          email: this.user.email,
          password: this.user.password
        }
      })

      if (error) {
        this.$notify({
          type: 'negative',
          message: error.message
        })
        return
      }

      this.token = token
      this.setUser(user)

      this.$notify({
        type: 'positive',
        message: message
      })

      const decoded = jwtDecode(token);
      if (decoded.role === USER_ROLES.ADMIN) {
        return navigateTo({ name: 'admin' })
      }
      return navigateTo({ name: 'user' })
    },

    async signup() {
      try {
        const { API_URL } = useRuntimeConfig().public
      const { user, token, error, message } = await $fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        body: {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          samePassword: this.user.samePassword
        }
      })

      if (error) {
        this.$notify({
          type: 'negative',
          message: error.message
        })
        return
      }

      this.token = token
      this.setUser(user)

      this.$notify({
        type: 'positive',
        message: message
      })

      return navigateTo({ name: 'user' })
      } catch (err) {
        console.warn(`error in signup store`, err)
      }
    },

    logoutFromMiddleware() {
      this.$patch({
        user: {
          id: null,
          name: null,
          email: null,
          password: null,
          samePassword: null
        },
        token: null
      })
    },
    logout() {
      this.logoutFromMiddleware();

      this.$notify({
        type: 'positive',
        message: 'Logged out successfully'
      })

      return navigateTo({
        name: 'login'
      });
    }
  },

  getters: {
    isAuthenticated: (state) => !!state.token
  }
})
