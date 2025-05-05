import { helpers, required } from "@vuelidate/validators"
import vueValidate from "@vuelidate/core"

export const useActivityLevel = () => {
  try {
    const activityLevel = computed(() => useActivityLevelStore().activityLevel)
    const rules = computed(() => ({
      levelName: {
        required: helpers.withMessage('Level Name is required', required),
      }
    }))

    const $v = vueValidate(rules, activityLevel)

    return { $v }

  } catch (err) {
    console.warn(`error in activity level validation`, err)
  }
}
