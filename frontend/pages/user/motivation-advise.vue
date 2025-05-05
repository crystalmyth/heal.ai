<template>
  <div>
    <ui-section-header title="Motivation & Advise" icon="tips_and_updates" hide-btn />
    <q-card v-if="isMotivationAdvise" class="q-mt-md">
      <q-card-section>
        {{ motivationAdvise.motivational_advice }}
      </q-card-section>
    </q-card>
    <q-form @submit.prevent="onSubmit" class="q-mt-md">
      <q-card>
        <q-card-section>
          <form-select class="col" label="Activity Level" v-model="user.activityLevel" :options="activity_levels" use-input
            clearable :errors="$v.activityLevel.$errors" />
          <form-select class="col" label="Primary Goal" v-model="user.primaryGoal" :options="primary_goals" use-input
            clearable :errors="$v.primaryGoal.$errors" />
          <form-input label="Current Challenges" v-model="user.currentChallenges" :errors="$v.currentChallenges.$errors" />
        </q-card-section>
        <q-card-actions>
          <q-btn type="submit" class="bg-primary text-white q-mt-sm full-width">Motivation & Advise</q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
const { fetchUser } = useUserStore();

await fetchUser();
const { user, activity_levels, primary_goals } = storeToRefs(useUserStore());

const { $v } = useMotivationAdvise()

const { fetchMotivationAdvise } = usePlanStore();
const{ motivationAdvise } = storeToRefs(usePlanStore());
const isMotivationAdvise = computed(() => usePlanStore().isMotivationAdvise);
const onSubmit = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return;

  await fetchMotivationAdvise()
}
</script>

<style>

</style>