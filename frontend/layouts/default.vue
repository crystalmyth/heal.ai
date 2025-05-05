<template>
  <q-layout view="hHh lpR fFf">

    <ui-navbar @toggleLeftDrawer="toggleLeftDrawer" />

    <ui-sidebar v-if="isAuthenticated" v-model="leftDrawerOpen" class="shadow-10" />
    <q-page-container>
      <q-page :class="[$screen.lt.sm ? 'q-pa-md' : 'q-pa-xl']">
        <slot />
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script setup>
const isAuthenticated = computed(() => useAuthStore().isAuthenticated);
const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const $screen = useQuasar().screen;
</script>

<style></style>