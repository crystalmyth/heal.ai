<template>
  <q-dialog :model-value="modelValue" @hide="emit('update:modelValue', false)">
    <q-card>
      <q-card-section class="row q-gutter-xl items-center header">
        <span class="text-bold text-h6">{{ title }}</span>
        <q-space />
        <q-btn v-if="!$screen.lt.sm" class="bg-negative text-white q-px-sm" icon="close" rounded v-ripple @click.prevent="emit('update:modelValue', false)" />
      </q-card-section>
      <q-card-section>
        <slot />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
const $screen = useQuasar().screen;
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.header {
  border-bottom: 1px solid grey;
}
</style>