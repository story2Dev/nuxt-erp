// https://nuxt.com/docs/api/configuration/nuxt-config
import { TOKEN_KEY } from './constants/';
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@bg-dev/nuxt-naiveui',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxtjs/i18n',
    '@nuxtjs/apollo',
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
  runtimeConfig: {
    public: {
      authApi: process.env.NUXT_AUTH_API,
    },
  },
  apollo: {
    autoImports: true,
    authType: 'Bearer',
    authHeader: 'Authorization',
    tokenStorage: 'cookie',
    proxyCookies: true,
    clients: {
      default: {
        httpLinkOptions: {
          credentials: 'include',
        },
        httpEndpoint: `${process.env.NUXT_AUTH_GRAPHQL}`,
        websocketsOnly: false,
        tokenName: TOKEN_KEY,
        authHeader: 'Authorization',
      },
    },
  },
});
