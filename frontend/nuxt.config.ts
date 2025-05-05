export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    `@/assets/scss/main.scss`
  ],
  modules: [
    'nuxt-quasar-ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vite-pwa/nuxt',
  ],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL
    }
  },
  quasar: {
    config: {
      // brand: {
      //   primary: '#4F46E5',
      //   secondary: '#111827',
      // }
    },
    extras: {
      fontIcons: ['mdi-v7'],
    },
    plugins: ['Notify'],
  },
  routeRules: {
    '/admin/**': { appMiddleware: 'auth-check' },
    '/user/**': { appMiddleware: 'auth-check' }
  }
})
