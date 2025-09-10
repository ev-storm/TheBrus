// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["~/assets/css/fonts.css", "~/assets/css/main.css"],
  app: {
    head: {
      script: [
        {
          src: "https://api-maps.yandex.ru/2.1/?apikey=7da41200-bb84-45a3-b01d-da796bbb5afb&lang=ru_RU",
          type: "text/javascript",
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
