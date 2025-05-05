<template>
  <q-card>
    <q-card-section :class="[$screen.lt.sm ? 'column' : 'row justify-between items-center']">
      <h2 class="text-h6 text-bold"><q-icon v-if="icon" :name="icon" class="q-mr-sm" /> {{ title }}</h2>
      <q-btn v-if="!hideBtn" label="create" icon="add" @click.prevent="emit('create')" class="bg-primary text-white" :class="{'q-mt-md': $screen.lt.sm}" />
    </q-card-section>
  </q-card>
</template>

<script setup>
const $screen = useQuasar().screen;
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: [String, null],
    default: null
  },
  hideBtn: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['create'])
</script>

<style></style>