import { helpers, required } from "@vuelidate/validators"
import vueValidate from "@vuelidate/core"

export const useDietaryPreference = () => {
  try {
    const dietaryPreference = computed(() => useDietaryPreferenceStore().dietaryPreference)
    const rules = computed(() => ({
      preferenceName: {
        required: helpers.withMessage('Preference Name is required', required),
      }
    }))

    const $v = vueValidate(rules, dietaryPreference)

    return { $v }

  } catch (err) {
    console.warn(`error in dietary preference validation`, err)
  }
}
