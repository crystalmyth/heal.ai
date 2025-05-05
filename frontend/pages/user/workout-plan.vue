<template>
  <div>
    <ui-section-header title="Workout Plan" hide-btn />
    
    <workout-container v-if="isWorkoutPlan" :workout-plan="workoutPlan" class="q-mt-md" />
    <ui-section-header v-if="isWorkoutPlan" title="Generate New Workout Plan" hide-btn class="q-mt-md" />
    <q-form @submit.prevent="onSubmit" class="q-mt-md">
      <q-card>
        <q-card-section>
          <div :class="[$screen.lt.sm ? 'column' : 'row q-gutter-sm']">
            <form-input class="col" label="Age" v-model="user.age" :errors="$v.age.$errors" />
            <form-input class="col" label="Height" v-model="user.height_cm" :errors="$v.height_cm.$errors" />
            <form-input class="col" label="Weight" v-model="user.weight_kg" :errors="$v.weight_kg.$errors" />
          </div>
          <form-select class="col" label="Primary Goal" v-model="user.primaryGoal" :options="primary_goals" use-input
            clearable :errors="$v.primaryGoal.$errors" />
        </q-card-section>
        <q-card-actions>
          <q-btn type="submit" class="bg-primary text-white q-mt-sm full-width">Workout plan</q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
const $screen = useQuasar().screen;

const { fetchUser } = useUserStore();

await fetchUser();

const { user, primary_goals } = storeToRefs(useUserStore());
const { $v } = useWorkoutPlan()

const { fetchWorkoutPlan } = usePlanStore();

const { workoutPlan } = storeToRefs(usePlanStore());

const isWorkoutPlan = computed(() => usePlanStore().isWorkoutPlan);
const onSubmit = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return;

  await fetchWorkoutPlan()
}
</script>

<style></style>