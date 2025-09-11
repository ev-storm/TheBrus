let ymaps3Promise: Promise<typeof window.ymaps3> | null = null;

export function loadYMaps3(
  apiKey: string,
  lang = "ru_RU"
): Promise<typeof window.ymaps3> {
  console.log("loadYMaps3 called with API key:", apiKey);
  
  if (typeof window === "undefined") {
    return Promise.reject(new Error("YMaps can be loaded only in browser"));
  }
  if ((window as any).ymaps3) {
    console.log("YMaps v3 already loaded");
    return Promise.resolve((window as any).ymaps3);
  }
  if (ymaps3Promise) {
    console.log("YMaps v3 loading in progress");
    return ymaps3Promise;
  }

  const url = `https://api-maps.yandex.ru/v3/?apikey=${encodeURIComponent(
    apiKey
  )}&lang=${lang}`;
  
  console.log("Loading YMaps v3 from URL:", url);
  console.log("Encoded API key:", encodeURIComponent(apiKey));
  
  // Проверим, что URL валидный
  try {
    new URL(url);
    console.log("URL is valid");
  } catch (e) {
    console.error("Invalid URL:", e);
  }

  ymaps3Promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => {
      console.log("YMaps v3 script loaded successfully");
      if ((window as any).ymaps3) resolve((window as any).ymaps3);
      else reject(new Error("YMaps v3 not available after script load"));
    };
    script.onerror = (error) => {
      console.error("Failed to load YMaps v3 script:", error);
      console.error("Script src:", script.src);
      console.error("Script readyState:", script.readyState);
      reject(new Error(`Failed to load YMaps v3 script: ${error}`));
    };
    
    // Добавим таймаут
    setTimeout(() => {
      if (!(window as any).ymaps3) {
        console.error("YMaps v3 script load timeout");
        reject(new Error("YMaps v3 script load timeout"));
      }
    }, 10000);
    
    document.head.appendChild(script);
  });

  return ymaps3Promise;
}
