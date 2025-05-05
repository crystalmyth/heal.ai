<template>
  <div class="row" :class="[$attrs.class]">
    <span class="col text-body1 text-bold">Fitness Level: {{ workoutPlan.fitness_level }}</span>
    <span class="col-shrink text-body1 text-bold">Primary Goal: {{ workoutPlan.goal }}</span>
  </div>
  <q-list bordered class="q-mt-md">
    <div v-for="(plan, planIndex) in workoutPlan.workout_plan" :key="plan.day">
      <q-expansion-item :default-opened="planIndex === 0">
        <template #header>
          <div class="row full-width items-center">
            <div class="col">
              <span class="text-bold q-mb-md">{{ plan.day }}</span>
            </div>
            <div class="col-shrink">
              <span class="block text-bold q-mr-xl"> {{ plan.exercises.length }} exercises</span>
            </div>
          </div>
        </template>
        <q-card class="q-ma-sm">
          <q-card-section>
            <div class="row">
              <div v-for="exercise in plan.exercises" :key="exercise" class="col-sm-4 q-pa-sm">
                <div class="shadow-2 q-pa-sm full-height">
                  <span class="block">Name: {{ exercise.name }}</span>
                  <span class="block">Sets: {{ exercise.sets }}</span>
                  <span class="block">Reps: {{ exercise.reps }}</span>
                  <span class="block">Rest: {{ exercise.rest }}</span>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator v-if="planIndex < workoutPlan.workout_plan.length - 1" />
    </div>
  </q-list>
</template>

<script setup>
const props = defineProps({
  workoutPlan: {
    type: Object,
    required: true
  }
})
</script>

<style></style>