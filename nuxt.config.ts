// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/css/element-plus.scss" as element;`,
        },
      },
    },
  },

  modules: [
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    'nuxt-feathers-pinia',
    'nuxt-lodash',
    '@nuxtjs/eslint-module',
  ],

  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.svg' }],
      title: 'PlaybackArt',
      htmlAttrs: { class: 'dark' },
    },
  },

  elementPlus: {
    themes: ['dark'],
    importStyle: 'scss',
    components: ['ElDivider'],
  },

  css: ['~/assets/css/main.scss', 'element-plus/theme-chalk/src/display.scss'],

  components: {
    global: true,
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },

  imports: {
    dirs: [
      'composables/**',
      'stores/**',
      'constants/**',
      'helpers/**',
      'utils/**',
    ],
  },

  typescript: {
    shim: false,
  },

  lodash: {
    prefix: '_',
    upperAfterPrefix: false,
  },

  devtools: {
    timeline: {
      enabled: true,
    },
  },
})
