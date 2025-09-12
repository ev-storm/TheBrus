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
    if (!window.ymaps3) {
      console.error("YMaps v3 failed to load - likely invalid API key");
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
    console.log("YMapZoomControl available:", !!ymaps3.YMapZoomControl);
    console.log("YMapControls available:", !!ymaps3.YMapControls);

    // Проверяем, что нужные классы доступны
    if (!ymaps3.YMap) {
      throw new Error("YMap class not available");
    }

    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapControls,
      YMapMarker,
    } = ymaps3;

    // Создаем карту с координатами Варсонофьевского переулка
    map = new YMap(mapContainer.value, {
      location: {
        center: [37.613575, 55.765635], // Варсонофьевский переулок, 10с2, Москва [долгота, широта]
        zoom: 17,
      },
      behaviors: ["drag", "scrollZoom"],
    });

    // Добавляем слои с темной темой и кастомизацией
    const scheme = new YMapDefaultSchemeLayer({
      theme: "dark",
      customization: [
        {
          tags: {
            any: ["food_and_drink", "shopping", "commercial_services"],
          },
          stylers: {
            visibility: "off",
          },
        },
        {
          tags: {
            any: ["traffic_light"],
          },
          stylers: {
            visibility: "off",
          },
        },
        {
          tags: {
            any: ["entrance"],
          },
          stylers: {
            visibility: "off",
          },
        },
        {
          tags: {
            any: ["road"],
            none: [
              "road_1",
              "road_2",
              "road_3",
              "road_4",
              "road_5",
              "road_6",
              "road_7",
            ],
          },
          elements: "label.icon",
          stylers: {
            visibility: "off",
          },
        },
        {
          tags: {
            any: ["transit"],
          },
          stylers: {
            visibility: "off",
          },
        },
      ],
    });
    const features = new YMapDefaultFeaturesLayer();
    map.addChild(scheme);
    map.addChild(features);

    // Добавляем контролы масштабирования
    const controlsContainer = new YMapControls({ position: "right" });
    map.addChild(controlsContainer);
    controls = [controlsContainer];

    // Координаты для маркера
    const coords = [37.613575, 55.765635]; // Варсонофьевский переулок, 10с2, Москва [долгота, широта]

    // Создаем маркер с кастомной SVG иконкой
    const markerEl = document.createElement("div");
    markerEl.style.width = "40px";
    markerEl.style.height = "40px";
    markerEl.style.cursor = "pointer";
    markerEl.style.display = "flex";
    markerEl.style.alignItems = "center";
    markerEl.style.justifyContent = "center";
    markerEl.style.transform = "translateY(-100%) translateX(-50%)";

    // Добавляем SVG иконку маркера
    markerEl.innerHTML = `
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <image href="/svg/button/map-cursor.svg" width="40" height="40"/>
      </svg>
    `;

    const marker = new YMapMarker({ coordinates: coords }, markerEl);

    map.addChild(marker);
    map.setLocation({ center: coords, zoom: 17 });

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
