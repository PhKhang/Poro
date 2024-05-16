// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // css: ['~/assets/base.css'],
  runtimeConfig: {
    MONGODB_PWD: process.env.MONGODB_PWD
  }
})
