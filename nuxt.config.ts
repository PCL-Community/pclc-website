// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxt/ui',
    '@compodium/nuxt'
  ],

  content: {
    experimental: {
      nativeSqlite: true
    }
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/fish.png' }
      ],
      titleTemplate: '%s - PCL Community'
    }
  },

  fonts: {
    provider: 'local'
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'static',
  }
})