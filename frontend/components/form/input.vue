<template>
  <q-input :label="label" :type="type" :model-value="modelValue" filled
    @update:model-value="emit('update:modelValue', $event)" :error="hasError"
    :error-message="errorMessage" aria-autocomplete="list" square :hint="hint" />
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: [String, Number, null],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  hint: {
    type: String,
    default: null
  },
  errors: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const hasError = computed(() => props.errors && props.errors?.length > 0)
const errorMessage = computed(() => props.errors && props.errors?.length > 0 ? props.errors[0]?.$message : '')
</script>

<style></style>