<template>
  <div :class="[$screen.lt.sm ? 'column' : 'row q-gutter-md']">
    <div class="col">
      <ui-section-header icon="directions_run" title="Activity Levels" @create="reset" />
      <ui-section-table class="q-mt-md" :columns="columns" :rows="getActivityLevels" @edit-row="editRow" @delete-row="deleteRow" />
    </div>
    <div class="col-shrink" :class="{ 'q-mt-md': $screen.lt.sm }">
      <q-form @submit.prevent="onSubmit">
        <q-card>
          <q-card-section>
            <h2 class="text-h6 text-bold">{{ activityLevel.id ? 'Edit' : 'Create' }} Activity Level</h2>
          </q-card-section>
          <q-card-section>
              <form-input v-model="activityLevel.levelName" label="Level Name" :errors="$v.levelName.$errors" />
          </q-card-section>
          <q-card-actions>
            <q-btn type="submit" class="bg-primary text-white q-mt-sm full-width">{{ activityLevel.id ? 'Update' : 'Create' }}</q-btn>
          </q-card-actions>
        </q-card>
      </q-form>
    </div>

    <Teleport to="body">
      <ui-section-modal title="Delete Activity Level" v-model="deleteDialog">
        <p class="text-body1">Are you sure you want to delete activity level: {{ deleteActivityLevel.levelName }}?</p>
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

const { columns, activityLevel, getActivityLevels, deleteDialog, deleteActivityLevel } = storeToRefs(useActivityLevelStore())

const { $v } = useActivityLevel()

const { create, update, fetchAll, editRow, reset, deleteRow, destroy } = useActivityLevelStore();
const onSubmit = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return;

  if(activityLevel.value.id) {
    await update();
  } else {
    await create();
  }
}

await fetchAll()
</script>

<style></style>