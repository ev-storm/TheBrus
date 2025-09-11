<template>
  <div class="yandex-map" ref="mapContainer"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const mapContainer = ref(null);
let map = null;
let controls = [];

const { $ymaps3 } = useNuxtApp();

// Скрипт загружается через nuxt.config.ts

onMounted(() => {
  console.log("YandexMap mounted");

  if (!mapContainer.value) {
    console.log("mapContainer not found");
    return;
  }

  // Ждем загрузки ymaps3
  const initMap = () => {
    if (window.ymaps3) {
      console.log("YMaps v3 is available, initializing map...");
      initMapWithYMaps3(window.ymaps3);
    } else {
      console.log("YMaps v3 not yet loaded, waiting...");
      setTimeout(initMap, 500);
    }
  };

  // Показываем сообщение об ошибке API ключа
  const showApiKeyError = () => {
    if (mapContainer.value) {
      mapContainer.value.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background: #f5f5f5;
          color: #666;
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
        ">
          <div>
            <h3>⚠️ Ошибка API ключа</h3>
            <p>Недействительный API ключ для Яндекс.Карт</p>
            <p>Получите новый ключ на <a href="https://developer.tech.yandex.ru/" target="_blank">developer.tech.yandex.ru</a></p>
            <p>И обновите ключ в nuxt.config.ts</p>
          </div>
        </div>
      `;
    }
  };

  // Проверяем, есть ли ошибка загрузки скрипта
  setTimeout(() => {
    if (!window.ymaps) {
      console.error("YMaps v2 failed to load - likely invalid API key");
      showApiKeyError();
    } else {
      initMap();
    }
  }, 3000);
});

const initMapWithYMaps3 = (ymaps3) => {
  try {
    console.log("Initializing map with YMaps v3");
    console.log("Available ymaps3 methods:", Object.keys(ymaps3));

    // Проверяем, что нужные классы доступны
    if (!ymaps3.YMap) {
      throw new Error("YMap class not available");
    }

    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapControls,
      YMapZoomControl,
      YMapMarker,
    } = ymaps3;

    // Создаем карту с примерными координатами
    map = new YMap(mapContainer.value, {
      location: {
        center: [55.761, 37.621], // Примерные координаты Москвы
        zoom: 15,
      },
      behaviors: ["drag", "scrollZoom"],
    });

    // Добавляем слои
    const scheme = new YMapDefaultSchemeLayer();
    const features = new YMapDefaultFeaturesLayer();
    map.addChild(scheme);
    map.addChild(features);

    // Добавляем контролы масштабирования
    const controlsContainer = new YMapControls({ position: "right" });
    const zoomControl = new YMapZoomControl({});
    controlsContainer.addChild(zoomControl);
    map.addChild(controlsContainer);
    controls = [controlsContainer];

    // Координаты для маркера
    const coords = [55.761, 37.621]; // Примерные координаты

    // Создаем маркер
    const markerEl = document.createElement("div");
    markerEl.style.width = "32px";
    markerEl.style.height = "32px";
    markerEl.style.borderRadius = "50%";
    markerEl.style.background = "#e53935";
    markerEl.style.boxShadow = "0 0 0 3px white, 0 2px 4px rgba(0,0,0,0.3)";
    markerEl.style.border = "2px solid #fff";
    markerEl.style.cursor = "pointer";

    // Добавляем иконку маркера
    markerEl.innerHTML = "📍";
    markerEl.style.fontSize = "16px";
    markerEl.style.display = "flex";
    markerEl.style.alignItems = "center";
    markerEl.style.justifyContent = "center";

    const marker = new YMapMarker({ coordinates: coords }, markerEl);

    map.addChild(marker);
    map.setLocation({ center: coords, zoom: 15 });

    console.log("Map initialized successfully with YMaps v3");
  } catch (error) {
    console.error("Ошибка инициализации карты:", error);

    // Показываем сообщение об ошибке
    if (mapContainer.value) {
      mapContainer.value.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background: #f5f5f5;
          color: #666;
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 20px;
          box-sizing: border-box;
        ">
          <div>
            <h3>Ошибка загрузки карты</h3>
            <p>${error.message}</p>
          </div>
        </div>
      `;
    }
  }
};

onBeforeUnmount(() => {
  try {
    if (map) {
      map.destroy?.();
      map = null;
    }
    controls = [];
  } catch (error) {
    console.error("Ошибка при уничтожении карты:", error);
  }
});
</script>

<style scoped>
.yandex-map {
  width: 100%;
  height: 400px;
}
</style>
