// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/css/fonts.css", "~/assets/css/main.css"],
  runtimeConfig: {
    ymapsApiKey:
      process.env.YMAPS_API_KEY || "2daa9fb2-779c-4369-b15e-8ba3c97897c5",
    public: {
      ymapsApiKey:
        process.env.YMAPS_API_KEY || "2daa9fb2-779c-4369-b15e-8ba3c97897c5",
    },
  },
  app: {
    head: {
      meta: [
        {
          name: "robots",
          content: "noindex, nofollow, noarchive, nosnippet, noimageindex",
        },
        {
          name: "googlebot",
          content: "noindex, nofollow, noarchive, nosnippet, noimageindex",
        },
        {
          name: "bingbot",
          content: "noindex, nofollow, noarchive, nosnippet, noimageindex",
        },
        {
          name: "yandexbot",
          content: "noindex, nofollow, noarchive, nosnippet, noimageindex",
        },
        {
          "http-equiv": "X-Robots-Tag",
          content: "noindex, nofollow, noarchive, nosnippet, noimageindex",
        },
      ],
      script: [
        {
          src: "https://api-maps.yandex.ru/v3/?apikey=2daa9fb2-779c-4369-b15e-8ba3c97897c5&lang=ru_RU",
          type: "text/javascript",
          async: true,
        },
      ],
      link: [
        {
          rel: "preload",
          href: "/fonts/Montserrat-VariableFont_wght.ttf",
          as: "font",
          type: "font/ttf",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/TTFirsNeue-Regular.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/TTFirsNeue-Medium.woff2",
          as: "font",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
      ],
    },
  },
});
