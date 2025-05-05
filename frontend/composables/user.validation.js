import useVuelidate from "@vuelidate/core"
import { required, helpers, minLength, minValue, maxValue } from "@vuelidate/validators"
export const useUser = () => {
  const user = computed(() => useUserStore().user)
  const rules = computed(() => ({
    name: {
      required: helpers.withMessage('Name is required', required),
      minLength: helpers.withMessage('Name must be at least 2 characters', minLength(2))
    },
    age: {
      required: helpers.withMessage('Age is required', required),
      min: helpers.withMessage('Age must be at least 18 years', minValue(18)),
      max: helpers.withMessage('Age must be at most 100 years', maxValue(100))
    },
    gender: {
      required: helpers.withMessage('Gender is required', required),
    },
    height_cm: {
      required: helpers.withMessage('Height is required', required),
      min: helpers.withMessage('Height must be at least 100 cm', minValue(100)),
    },
    weight_kg: {
      required: helpers.withMessage('Weight is required', required),
      min: helpers.withMessage('Weight must be at least 10 kg', minValue(10)),
    }
  }))

  const $v = useVuelidate(rules, user);

  return { $v }
}
