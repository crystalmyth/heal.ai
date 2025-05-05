<template>
  <q-drawer show-if-above :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)"
    side="left" bordered>
    <q-list>
      <nuxt-link v-for="item in sidebar" :key="item.label" :to="{ name: item.route_name }">
        <q-item :class="{'bg-primary text-white': $route.name === item.route_name}">
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>{{ item.label}}</q-item-section>
        </q-item>
        <q-separator />
      </nuxt-link>
    </q-list>
  </q-drawer>
</template>

<script setup>
import admin_sidebar from "~/assets/data/admin_sidebar.json"
import user_sidebar from "~/assets/data/user_sidebar.json"
const sidebar = ref(user_sidebar)

const layout = inject('layout')
if (layout.value === 'admin') {
  sidebar.value = admin_sidebar
}

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<style></style>