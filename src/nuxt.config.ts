// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    plugins: ["~/server/index.ts"]
  },

  // css: ['~/assets/base.css'],
  runtimeConfig: {
    mongoURI: process.env.MONGODB_URI,
    authSecret: process.env.AUTH_SECRET,
    API_ROUTE_SECRET: process.env.API_ROUTE_SECRET,
  },

  routeRules: {
    '/testing': { ssr: false }
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['widgetbot'].includes(tag),
    }
  },

  modules: ["@sidebase/nuxt-auth"],

  auth: {
    baseURL: process.env.VERCEL_URL ? `https://${VERCEL_URL}/api/auth` : process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs'
    }
  },

  // nuxtServerUtils: {
  //   mongodbUri: process.env.MONGODB_URI,
  // },

})
