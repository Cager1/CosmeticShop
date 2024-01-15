// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    // The private keys which are only available within server-side
    // apiUrl: '',
    // Keys within public, will be also exposed to the client-side
    public: {
      // from env
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      loginUrl: process.env.NUXT_PUBLIC_LOGIN_URL,
      adminUrl: process.env.NUXT_PUBLIC_ADMIN_URL,
      project: process.env.NUXT_PUBLIC_PROJECT,
    }
  },

  modules: [
      'nuxt-icon',
    '@pinia/nuxt',
    'nuxt-swiper',
    '@vee-validate/nuxt',
  ],


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
