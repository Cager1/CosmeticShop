// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    // The private keys which are only available within server-side
    // apiUrl: '',
    // Keys within public, will be also exposed to the client-side
    public: {
      // from env
      apiUrl: process.env.API_URL,
      loginUrl: process.env.LOGIN_URL,
      adminUrl: process.env.ADMIN_URL,
      projectID: process.env.PROJECT_ID,
    }
  },

  modules: [
      'nuxt-icon',
    'vue3-carousel-nuxt',
    '@pinia/nuxt',
  ],

  carousel: {
    prefix: 'Vue'
  },

  imports: {
    dirs: ['~/models','~/stores'],
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
