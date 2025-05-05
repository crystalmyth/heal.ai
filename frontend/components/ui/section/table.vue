<template>
  <q-table :rows="rows" :columns="columns">
      <template v-slot:body-cell-actions="props">
          <q-td :props="props">
              <q-btn flat icon="edit" @click="emit('editRow', props.row)" size="sm" />
              <q-btn flat icon="delete" @click="emit('deleteRow', props.row)" size="sm" />
          </q-td>
      </template>
  </q-table>
</template>

<script setup>
const props = defineProps({
  rows: {
      type: Array,
      default: () => []
  },
  columns: {
      type: Array,
      default: () => []
  }
})

const emit = defineEmits(['editRow', 'deleteRow'])
</script>

<style></style>