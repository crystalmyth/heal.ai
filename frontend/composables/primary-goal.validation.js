import { helpers, required } from "@vuelidate/validators"
import vueValidate from "@vuelidate/core"

export const usePrimaryGoal = () => {
  try {
    const primaryGoal = computed(() => usePrimaryGoalStore().primaryGoal)
    const rules = computed(() => ({
      goalName: {
        required: helpers.withMessage('Goal Name is required', required),
      }
    }))

    const $v = vueValidate(rules, primaryGoal)

    return { $v }

  } catch (err) {
    console.warn(`error in primary goal validation`, err)
  }
}
