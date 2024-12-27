// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
      bingUrl: 'https://wallpaperApi.atian.work'
    }
  }
})
