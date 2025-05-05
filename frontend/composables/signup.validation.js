import useVuelidate from "@vuelidate/core"
import { email, helpers, required } from "@vuelidate/validators"

export const useSignup = () => {
  try {
    const { user } = useAuthStore()
    const rules = computed(() => ({
      email: {
        required: helpers.withMessage('Email is required', required),
        email: helpers.withMessage('Invalid email', email)
      },
      password: {
        required: helpers.withMessage('Password is required', required)
      },
      name: {
        required: helpers.withMessage('Name is required', required)
      },
      samePassword: {
        required: helpers.withMessage('Password Confirmation is required', required),
        sameAsPassword: helpers.withMessage('Password does not match', (value) => value === user.password)
      }
    }))

    const $v = useVuelidate(rules, user)

    return { $v }
  } catch (err) {
    console.warn(`error in signup validation`, err)
    return null
  }
}
