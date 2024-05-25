// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  // css: ['~/assets/base.css'],
  runtimeConfig: {
    // MONGODB_PWD: process.env.MONGODB_PWD
  },

  modules: [
    // "@sidebase/nuxt-auth",
    // "nuxt-server-utils",
    "nuxt-mongoose"
  ],

  // auth: {
  //   provider: {
  //     type: 'authjs'
  //   }
  // },

  // nuxtServerUtils: {
  //   mongodbUri: process.env.MONGODB_URI,
  // },

})
