<template>
  <div>
    <q-list bordered>
      <div v-for="(item, itemIndex) in dietPlan.days" :key="day">
        <q-expansion-item :label="item.day" :default-opened="itemIndex === 0">
          <div v-for="meal in item.meals" :key="meal.meal_name" class="q-pa-md">
            <span>{{ meal.meal_name }}</span>
            <q-list>
              <q-item v-for="food_item in meal.food_items" :key="food_item.food_name" class="row justify-between q-gutter-sm">
                <span class="col">Food Name: {{ food_item.food_name }}</span>
                <span class="col">Portion Size: {{ food_item.portion_size }}</span>
                <span class="col">Protein: {{ food_item.protein_g }}g</span>
                <span class="col">Carbs: {{ food_item.carbs_g }}g</span>
                <span class="col">Fat: {{ food_item.fat_g }}g</span>
              </q-item>
            </q-list>
          </div>
        </q-expansion-item>
        <q-separator v-if="itemIndex < dietPlan.days.length - 1" />
      </div>
    </q-list>
  </div>
</template>

<script setup>
const props = defineProps({
  dietPlan: {
    type: Object,
    required: true
  }
})
</script>

<style>

</style>