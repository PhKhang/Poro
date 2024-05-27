// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    plugins: ["~/server/index.ts"]
  },
  
  // css: ['~/assets/base.css'],
  runtimeConfig: {
    mongoURI: process.env.MONGODB_URI
  },
  
  routeRules: {
    '/room-test': {ssr: false}
  },

  modules: [
    // "@sidebase/nuxt-auth",
    // "nuxt-server-utils",
    // "nuxt-mongoose"
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
