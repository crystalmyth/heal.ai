import useVuelidate from "@vuelidate/core";
import { helpers, maxValue, minValue, required } from "@vuelidate/validators";

export const useDietPlan = () => {
  const { user } = useUserStore();

  const rules = computed(() => ({
    age: {
      required: helpers.withMessage('Age is required', required),
      min: helpers.withMessage('Age must be at least 18 years', minValue(18)),
      max: helpers.withMessage('Age must be at most 100 years', maxValue(100))
    },
    height_cm: {
      required: helpers.withMessage('Height is required', required),
      min: helpers.withMessage('Height must be at least 100 cm', minValue(100)),
    },
    weight_kg: {
      required: helpers.withMessage('Weight is required', required),
      min: helpers.withMessage('Weight must be at least 10 kg', minValue(10)),
    },
    activityLevel: {
      required: helpers.withMessage('Activity Level is required', required),
    },
    dietaryPreference: {
      required: helpers.withMessage('Dietary Preference is required', required),
    }
  }))

  const $v = useVuelidate(rules, user);

  return { $v }
}
