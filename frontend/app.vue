<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
    <q-inner-loading :showing="isLoading" class="app-loader">
      <q-spinner-gears size="10rem" color="primary" />
    </q-inner-loading>
  </NuxtLayout>
</template>

<script setup>
const layout = ref('default');

watch(() => useRoute(), () => layout.value = useRoute().meta.layout, { immediate: true });

provide('layout', layout);

const isLoading = computed(() => useLoaderStore().isLoading);
</script>

<style lang="scss" scoped>
.app-loader{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}
</style>