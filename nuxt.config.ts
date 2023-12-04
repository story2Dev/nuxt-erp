// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@bg-dev/nuxt-naiveui',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/i18n',
  ],
  tailwindcss: {
    exposeConfig: true,
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en-US.json', name: 'English' },
      { code: 'fr', iso: 'fr-FR', file: 'fr-FR.json', name: 'Français' },
      { code: 'lo', iso: 'lo-LA', file: 'lo-LA.json', name: 'ລາວ' },
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
  },
});
