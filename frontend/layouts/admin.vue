<template>
  <q-layout view="hHh lpR fFf">

    <ui-navbar @toggleLeftDrawer="toggleLeftDrawer"/>

    <ui-sidebar v-if="isAuthenticated" v-model="leftDrawerOpen" class="shadow-10" />

    <q-page-container>
      <div :class="[$screen.lt.sm ? 'q-pa-md' : 'q-pa-xl']">
        <slot />
      </div>
    </q-page-container>

  </q-layout>
</template>

<script setup>
const $screen = useQuasar().screen;
const isAuthenticated = computed(() => useAuthStore().isAuthenticated);
const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>