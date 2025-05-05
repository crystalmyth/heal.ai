<template>
  <div>
    <ui-section-header title="Diet Plan" hide-btn />
    <diet-container :diet-plan="dietPlan" class="q-mt-md" />
    <ui-section-header v-if="isDietPlan" title="Generate New Diet Plan" hide-btn class="q-mt-md" />
    <q-form @submit.prevent="onSubmit" class="q-mt-md">
      <q-card>
        <q-card-section>
          <div class="row q-gutter-sm">
            <form-input class="col" label="Age" v-model="user.age" :errors="$v.age.$errors" />
            <form-input class="col" label="Height" v-model="user.height_cm" :errors="$v.height_cm.$errors" />
            <form-input class="col" label="Weight" v-model="user.weight_kg" :errors="$v.weight_kg.$errors" />
          </div>
          <form-select label="Primary Goal" v-model="user.primaryGoal" :options="primary_goals" use-input
            clearable :errors="$v.primaryGoal.$errors" />
          <form-select label="Dietary Preference" v-model="user.dietaryPreference" :options="dietary_preferences" use-input
            clearable :errors="$v.dietaryPreference.$errors" />
          <form-input label="Dietary Restriction" v-model="user.dietaryRestriction"/>
        </q-card-section>
        <q-card-actions>
          <q-btn type="submit" class="bg-primary text-white q-mt-sm full-width">Diet plan</q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
const { fetchUser } = useUserStore();
await fetchUser();

const isDietPlan = computed(() => usePlanStore().isDietPlan);

const { user, primary_goals, dietary_preferences } = storeToRefs(useUserStore());

const { $v } = useDietPlan()

const { fetchDietPlan } = usePlanStore();
const { dietPlan } = storeToRefs(usePlanStore());
const onSubmit = async () => {
  const isValid = await $v.value.$validate();
  if (!isValid) return;

  await fetchDietPlan()
}
</script>

<style>

</style>