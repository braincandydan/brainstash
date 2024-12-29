// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-12-25',
  build: {
    transpile: ['pinia-plugin-persistedstate']
  },
  nitro: {
    preset: 'vercel'
  }
})