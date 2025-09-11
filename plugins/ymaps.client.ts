import { loadYMaps3 } from "~/utils/loadYMaps3";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const apiKey = config.public.ymapsApiKey;
  console.log("[YMaps] Plugin initialized with API key:", apiKey);
  
  if (!apiKey) {
    console.warn("[YMaps] Не указан ключ в runtimeConfig.public.ymapsApiKey");
    return;
  }

  // Ленивая загрузка по запросу, а не сразу:
  const ymaps3Loader = {
    load: (lang?: string) => {
      console.log("[YMaps] Loader called with lang:", lang);
      return loadYMaps3(apiKey, lang);
    },
  };

  // Доступ из компонентов через useNuxtApp().$ymaps3
  return {
    provide: {
      ymaps3: ymaps3Loader,
    },
  };
});
