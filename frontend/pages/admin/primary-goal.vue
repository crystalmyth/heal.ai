<template>
  <div :class="[$screen.lt.sm ? 'column' : 'row q-gutter-md']">
    <div class="col">
      <ui-section-header icon="directions_run" title="Primary Goals" @create="reset" />
      <ui-section-table class="q-mt-md" :columns="columns" :rows="getPrimaryGoals" @edit-row="editRow" @delete-row="deleteRow" />
    </div>
    <div class="col-shrink" :class="{ 'q-mt-md': $screen.lt.sm }">
      <q-form @submit.prevent="onSubmit">
        <q-card>
          <q-card-section>
            <h2 class="text-h6 text-bold">{{ primaryGoal.id ? 'Edit' : 'Create' }} Primary Goal</h2>
          </q-card-section>
          <q-card-section>
              <form-input v-model="primaryGoal.goalName" label="Goal Name" :errors="$v.goalName.$errors" />
          </q-card-section>
          <q-card-actions>
            <q-btn type="submit" class="bg-primary text-white q-mt-sm full-width">{{ primaryGoal.id ? 'Update' : 'Create' }}</q-btn>
          </q-card-actions>
        </q-card>
      </q-form>
    </div>

    <Teleport to="body">
      <ui-section-modal title="Delete Primary Goal" v-model="deleteDialog">
        <p class="text-body1">Are you sure you want to delete primary goal: {{ deletePrimaryGoal.goalName }}?</p>
        <div class="row justify-end q-mt-xl">
          <q-btn icon="delete" label="Delete" class="bg-negative text-white q-mr-sm" @click.prevent="destroy"/>
        </div>
      </ui-section-modal>
    </Teleport>
  </div>
</template>

<script setup>
const $screen = useQuasar().screen;
definePageMeta({
  layout: 'admin'
})

const { columns, primaryGoal, getPrimaryGoals, deleteDialog, deletePrimaryGoal } = storeToRefs(usePrimaryGoalStore())

const { $v } = usePrimaryGoal()

const { create, update, fetchAll, editRow, reset, deleteRow, destroy } = usePrimaryGoalStore();
const onSubmit = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return;

  if(primaryGoal.value.id) {
    await update();
  } else {
    await create();
  }
}

await fetchAll()
</script>

<style></style>