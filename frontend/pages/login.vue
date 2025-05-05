<template>
  <div class="row items-center justify-center full-width section">
    <q-form :class="[$screen.lt.sm ? 'col-12': 'col-sm-8']" @click.prevent="onSubmit">
      <q-card class="shadow-10">
        <q-card-section class="column q-gutter-md">
          <h1 class="text-h4 text-bold text-center">Login</h1>
          <form-input label="Email" type="email" v-model="user.email" :errors="$v.email.$errors" />
          <form-input label="Password" type="password" v-model="user.password" :errors="$v.password.$errors" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn type="submit" class="bg-primary text-white q-mx-sm">Login</q-btn>
        </q-card-actions>
      </q-card>

      <q-btn type="button" class="q-mt-sm bg-primary text-white" v-ripple @click.stop="setUser">Login AS
        Admin</q-btn>
    </q-form>
  </div>
</template>

<script setup>
const $screen = useQuasar().screen;
definePageMeta({
  middleware: 'auth-redirect'
})

const { user } = storeToRefs(useAuthStore())
const { $v } = useLogin()

const { login } = useAuthStore();
const onSubmit = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return;

  await login()
}

const setUser = () => {
  user.value.email = 'admin@example.com'
  user.value.password = 'adminpassword'
}
</script>

<style lang="scss" scoped>
.section {
  height: calc(100vh - 4rem);
}
</style>