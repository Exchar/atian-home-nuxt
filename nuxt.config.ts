// https://nuxt.com/docs/api/configuration/nuxt-config
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
export default defineNuxtConfig({
  app: {
    head: {
      title: 'atian的小屋',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1,user-scalable=no,maximum-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ]
    },
  },
  ssr:true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@vuesax-alpha/nuxt', '@hypernym/nuxt-gsap', '@nuxtjs/tailwindcss', 'nuxtjs-naive-ui'],
  vuesaxAlpha: {
    themes: ['dark'],
  },
  runtimeConfig: {
    // bingUrl: 'https://wallpaperApi.atian.work',
    public: {
      bingUrl: 'https://bing.biturl.top',
      weatherPage: 'https://weather.atian.work/#/today?external=1',
      serviceUrl: 'https://atian.work/api/atianHome'
    }
  },
  typescript: {
    typeCheck:true
  },
  gsap: {
    composables: true
  },
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          }
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ]
  }
})