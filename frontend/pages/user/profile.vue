<template>
  <q-form @submit.prevent="onSubmit">
    <q-card>
      <q-card-section>
        <h2 class="text-h6">Profile</h2>
      </q-card-section>
      <q-card-section>
        <div :class="[$screen.lt.sm ? 'column' : 'row q-gutter-sm']">
          <form-input class="col" label="Name" v-model="user.name" :errors="$v.name.$errors"/>
          <form-input class="col" label="Email" v-model="user.email" readonly/>
        </div>
        <div class="q-mt-md" :class="[$screen.lt.sm ? 'column' : 'row q-gutter-sm']">
          <form-input class="col" label="Age" v-model="user.age" :errors="$v.age.$errors" />
          <form-select class="col" label="Gender" v-model="user.gender" :options="gender_list" :errors="$v.gender.$errors" />
          <form-input class="col" label="Height" v-model="user.height_cm" type="number" hint="Height should be in CM" :errors="$v.height_cm.$errors" />
          <form-input class="col" label="Weight" v-model="user.weight_kg" type="number" hint="Weight should be in KG" :errors="$v.weight_kg.$errors" />
        </div>
        <div class="q-mt-md" :class="[$screen.lt.sm ? 'column' : 'row q-gutter-sm']">
          <form-select class="col" label="Activity Level" v-model="user.activityLevel" :options="activity_levels" use-input clearable />
          <form-select class="col" label="Dietary Preferences" v-model="user.dietaryPreference" :options="dietary_preferences" use-input clearable />
          <form-select class="col" label="Primary Goal" v-model="user.primaryGoal" :options="primary_goals" use-input clearable />
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn type="submit" class="bg-primary text-white q-mt-sm full-width">Update</q-btn>
      </q-card-actions>
    </q-card>
  </q-form>
</template>

<script setup>
const $screen = useQuasar().screen;
const { fetchUser, update } = useUserStore();

await fetchUser();

const { user, activity_levels, dietary_preferences, primary_goals } = storeToRefs(useUserStore());

const gender_list = Object.entries(GENDER).map(([label, value]) => ({ label, value }));

const { $v } = useUser()
const onSubmit = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return;

  await update();
}
</script>