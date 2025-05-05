import { email, helpers, required } from "@vuelidate/validators"
import vueValidate from "@vuelidate/core"

export const useLogin = () => {
  try {
    const { user } = useAuthStore()

    const rules = computed(() => ({
      email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Invalid email', email)
      },
      password: {
        required: helpers.withMessage('Password is required', required)
      }
    }))

    const $v = vueValidate(rules, user)

    return { $v }

  } catch (err) {
    console.warn(`error in login validation`, err)
    return null
  }
}
