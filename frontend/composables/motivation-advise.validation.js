import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";

export const useMotivationAdvise = () => {
  const { user } = useUserStore();

  const rules = computed(() => ({
    activityLevel: {
      required: helpers.withMessage('Activity Level is required', required),
    },
    primaryGoal: {
      required: helpers.withMessage('Primary Goal is required', required),
    },
    currentChallenges: {
      required: helpers.withMessage('Current Challenges is required', required),
    }
  }))

  const $v = useVuelidate(rules, user);

  return { $v }
}
