<template>
  <q-select :label="label" :options="filterOptions" v-model="internalValue" filled
    :error="hasError"
    :error-message="errorMessage" square :hint="hint"
    filterable
    @filter="handleFilter"
    @input="handleInput"
    @update:model-value="emit('update:modelValue', internalValue)"
    :clearable="clearable"
    :use-input="useInput" />
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: [String, Number, null, Object],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    default: () => []
  },
  hint: {
    type: String,
    default: null
  },
  errors: {
    type: Array,
    default: () => []
  },
  useInput: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const hasError = computed(() => props.errors && props.errors?.length > 0)
const errorMessage = computed(() => props.errors && props.errors?.length > 0 ? props.errors[0]?.$message : '')

const internalValue = ref(props.modelValue)
const filteredOptions = ref(props.options)
const searchQuery = ref('')

const filterOptions = computed(() => {
  if (searchQuery.value && !filteredOptions.value.find(opt =>
        typeof opt === 'object' ? opt.value === searchQuery.value : opt === searchQuery.value
    )) {
    const newOption = typeof props.options[0] === 'object'
        ? { label: searchQuery.value, value: searchQuery.value }
        : searchQuery.value;
    return [...filteredOptions.value, newOption];
  }
  return filteredOptions.value;
})


function handleFilter(val, update) {
    searchQuery.value = val;
    if (!val) {
      filteredOptions.value = props.options;
      update(() => {
        filteredOptions.value = props.options;
      });
      return;
    }

    update(() => {
      const needle = val.toLowerCase();
      filteredOptions.value = props.options.filter(opt => {
        const label = typeof opt === 'object' ? opt.label : opt;
        return String(label).toLowerCase().indexOf(needle) > -1;
      });
    });
}
function handleInput(val){
  searchQuery.value = val;
}

watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal;
  }
)
</script>

<style></style>