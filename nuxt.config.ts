// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: [],
  ssr: false, // Отключаем SSR для статического хостинга
  css: ["~/assets/css/fonts.css", "~/assets/css/main.css"],
  runtimeConfig: {
    ymapsApiKey:
      process.env.YMAPS_API_KEY || "2daa9fb2-779c-4369-b15e-8ba3c97897c5",
    public: {
      ymapsApiKey:
        process.env.YMAPS_API_KEY || "2daa9fb2-779c-4369-b15e-8ba3c97897c5",
    },
  },
  nitro: {
    preset: "static", // Статическая генерация для Apache хостинга
    routeRules: {
      "/": { prerender: true },
      "/portfolio": { prerender: true },
      "/contacts": { prerender: true },
      "/constructor": { prerender: true },
      "/house": { prerender: true },
    },
  },
  app: {
    head: {
      title: "TheBrus - Строительство каркасных домов под ключ в Москве и МО",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        {
          name: "robots",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        {
          name: "googlebot",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        {
          name: "bingbot",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        {
          name: "yandexbot",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        {
          name: "description",
          content:
            "Строительство каркасных домов под ключ в Москве и Московской области. Каркасно-щитовые дома, дома из клееного бруса. Недорого, качественно, с гарантией.",
        },
        {
          name: "keywords",
          content:
            "строительство каркасных домов, строительство каркасных домов под ключ, строительство каркасного дома цена за м2, стоимость строительства каркасного дома, строительство каркасных домов в москве, строительство каркасных домов в московской области, строительство каркасных домов под ключ цена, каркасный дом под ключ, каркасные дома под ключ московская область, заказать строительство каркасного дома, заказать каркасный дом под ключ, строительство деревянных домов, строительство деревянных домов под ключ, строительство деревянного дома под ключ цена, строительство деревянных домов в московской области, каркасник под ключ, каркасник под ключ московская область, стоимость каркасника под ключ, каркасный дом под ключ с ремонтом цена, каркасные дома, каркасные дома МО, каркасные дома московская область, каркасные дома недорого, каркасные дома для постоянного проживания, каркасные дома в МО под ключ цена, каркасный дом под ключ московская область, каркасные дома под ключ недорого, каркасный дом цена за м2, строительство каркасно щитовых домов, домокомплект каркасного дома, каркасно панельные дома, строительство панельно каркасных домов, строительство каркасно щитовых домов в москвоской области, панельно каркасные дома под ключ цены, каркасно щитовой дом под ключ, каркасно щитовые дома в москве под ключ, щитовые дома, каркасно щитовые дома цена, каркасно щитовые дома, каркасно щитовые дома московская область, заказать дом из клееного бруса, дома из клееного бруса, строительство домов из клеенного бруса, строительство дома из клееного бруса под ключ, дома из клееного бруса под ключ недорого, стоимость дома из клееного бруса, дома из клееного бруса цена за м2",
        },
        {
          property: "og:title",
          content:
            "TheBrus - Строительство каркасных домов под ключ в Москве и МО",
        },
        {
          property: "og:description",
          content:
            "Строительство каркасных домов под ключ в Москве и Московской области. Каркасно-щитовые дома, дома из клееного бруса. Недорого, качественно, с гарантией.",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:locale",
          content: "ru_RU",
        },
      ],
      script: [
        {
          innerHTML: `(function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=104188545', 'ym');

          ym(104188545, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`,
          type: "text/javascript",
        },
        {
          src: "https://api-maps.yandex.ru/v3/?apikey=2daa9fb2-779c-4369-b15e-8ba3c97897c5&lang=ru_RU",
          type: "text/javascript",
          async: true,
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "TheBrus",
            description:
              "Строительство каркасных домов под ключ в Москве и Московской области",
            url: "https://thebrus.ru",
            logo: "https://thebrus.ru/logo.svg",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Варсонофьевский переулок, 10с2",
              addressLocality: "Москва",
              postalCode: "107031",
              addressCountry: "RU",
            },
            areaServed: [
              {
                "@type": "City",
                name: "Москва",
              },
              {
                "@type": "State",
                name: "Московская область",
              },
            ],
            serviceType: "Строительство каркасных домов",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Услуги строительства",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Строительство каркасных домов под ключ",
                    description:
                      "Строительство каркасных домов под ключ в Москве и МО",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Строительство каркасно-щитовых домов",
                    description:
                      "Строительство каркасно-щитовых домов под ключ",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Строительство домов из клееного бруса",
                    description:
                      "Строительство домов из клееного бруса под ключ",
                  },
                },
              ],
            },
          }),
        },
      ],
      noscript: [
        {
          innerHTML:
            '<div><img src="https://mc.yandex.ru/watch/104188545" style="position:absolute; left:-9999px;" alt="" /></div>',
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "shortcut icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          href: "/favicon.ico",
        },
        {
          rel: "sitemap",
          type: "application/xml",
          href: "/sitemap.xml",
        },
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
