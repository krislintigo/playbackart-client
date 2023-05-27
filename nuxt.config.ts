// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
    'nuxt-feathers-pinia',
    'nuxt-lodash',
  ],
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
      title: 'PlaybackArt',
    },
  },
  elementPlus: {
    themes: ['dark'],
  },
  // css: [
  // 'vuetify/lib/styles/main.sass',
  // '@mdi/font/css/materialdesignicons.min.css',
  // '~/assets/css/main.sass',
  // ],
  // build: {
  //   transpile: ['vuetify'],
  // },
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
