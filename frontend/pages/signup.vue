<template>
  <div class="row items-center justify-center full-width section">
    <q-form :class="[$screen.lt.sm ? 'col-12': 'col-sm-8']" @click.prevent="onSubmit">
      <q-card class="shadow-10">
        <q-card-section class="column q-gutter-md">
          <h1 class="text-h4 text-bold text-center">Signup</h1>
          <form-input label="Name" v-model="user.name" :errors="$v.name.$errors" />
          <form-input label="Email" type="email" v-model="user.email" :errors="$v.email.$errors" />
          <form-input label="Password" type="password" v-model="user.password" :errors="$v.password.$errors" />
          <form-input label="Password Confirmtion" type="password" v-model="user.samePassword" :errors="$v.samePassword.$errors" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn type="submit" class="bg-primary text-white q-mx-sm">Create Account</q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
const $screen = useQuasar().screen;
definePageMeta({
  middleware: 'auth-redirect'
})
const { user } = storeToRefs(useAuthStore())
const { $v } = useSignup()

const { signup } = useAuthStore();
const onSubmit = async () => {
  const isValid = await $v.value.$validate()
  if (!isValid) return;

  await signup()
}
</script>

<style lang="scss" scoped>
.section {
  height: calc(100vh - 4rem);
}
</style>