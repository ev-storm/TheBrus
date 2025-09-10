<template>
  <div class="yandex-map" ref="mapContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const mapContainer = ref(null);
let map = null;

onMounted(() => {
  console.log("YandexMap mounted");
  if (typeof window !== "undefined" && window.ymaps) {
    console.log("ymaps already loaded");
    initMap();
  } else {
    console.log("waiting for ymaps to load...");
    // Ждем загрузки API
    const checkYmaps = setInterval(() => {
      if (window.ymaps) {
        console.log("ymaps loaded!");
        clearInterval(checkYmaps);
        initMap();
      }
    }, 100);
  }
});

const initMap = () => {
  if (!mapContainer.value) {
    console.log("mapContainer not found");
    return;
  }

  console.log("Initializing map...");
  try {
    window.ymaps.ready(() => {
      console.log("ymaps.ready callback executed");

      // Сначала создаем карту с примерными координатами
      map = new window.ymaps.Map(mapContainer.value, {
        center: [55.761, 37.621], // Примерные координаты Москвы
        zoom: 15,
        controls: ["zoomControl"], // Добавляем нативные кнопки масштабирования
        behaviors: ["drag"], // Только перетаскивание, без скролла
      });

      // Темная тема
      map.options.set("theme", "dark");

      // Геокодируем адрес для получения точных координат
      const address = "Варсонофьевский переулок, 10с2, Москва, 107031";
      console.log("Geocoding address:", address);

      window.ymaps
        .geocode(address)
        .then((res) => {
          const firstGeoObject = res.geoObjects.get(0);
          if (firstGeoObject) {
            const coords = firstGeoObject.geometry.getCoordinates();
            console.log("Found coordinates:", coords);

            // Добавляем маркер с точными координатами
            const placemark = new window.ymaps.Placemark(coords, {
              balloonContent: address,
            });

            map.geoObjects.add(placemark);
            map.setCenter(coords);
            console.log("Map initialized successfully with correct address");
          } else {
            console.error("Address not found");
          }
        })
        .catch((err) => {
          console.error("Ошибка при геокодировании:", err);
        });
    });
  } catch (error) {
    console.error("Ошибка инициализации карты:", error);
  }
};

onUnmounted(() => {
  if (map) {
    map.destroy();
  }
});
</script>

<style scoped>
.yandex-map {
  width: 100%;
  height: 400px;
}
</style>
