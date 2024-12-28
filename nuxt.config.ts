// https://nuxt.com/docs/api/configuration/nuxt-config
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
  modules: ['@vuesax-alpha/nuxt'],
  vuesaxAlpha: {
    themes: ['dark'],
  },
  runtimeConfig: {
    // bingUrl: 'https://wallpaperApi.atian.work',
    public: {
      bingUrl: 'https://bing.biturl.top',
      weatherPage: 'https://192.168.211.192:8081/weatherReport/#/today?external=1'
    }
  }
})
