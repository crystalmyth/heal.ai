<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar>
          <q-icon name="spa" size="md"/>
        </q-avatar>
        Heal AI

        <q-btn icon="menu" v-if="isAuthenticated" flat @click.prevent="emit('toggleLeftDrawer', false)" />
      </q-toolbar-title>

      <div v-if="!isAuthenticated">
        <q-btn flat to="/login">Login</q-btn>
        <q-btn flat to="/signup">Signup</q-btn>
      </div>
      <div v-else>
        <q-btn flat @click.prevent="logout">Logout</q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
const isAuthenticated = computed(() => useAuthStore().isAuthenticated);
const { logout } = useAuthStore();

const emit = defineEmits(['toggleLeftDrawer'])
</script>

<style></style>