// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/css/element-plus.scss" as *;`,
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
  ],
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
      title: 'PlaybackArt',
      htmlAttrs: { class: 'dark' },
    },
  },
  elementPlus: {
    themes: ['dark'],
  },
  css: ['~/assets/css/main.scss'],
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
    dirs: ['composables/**', 'stores/**', 'lib/**', 'router/**'],
  },
  typescript: {
    shim: false,
  },
  lodash: {
    prefix: '_',
    upperAfterPrefix: false,
  },
})
