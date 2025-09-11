<template>
  <div>
    <h2>Тестовая карта</h2>
    <div
      ref="mapContainer"
      style="width: 100%; height: 400px; border: 1px solid #ccc"
    ></div>
    <div>
      <p>Статус: {{ status }}</p>
      <p>Ошибка: {{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const mapContainer = ref(null);
const status = ref("Загрузка...");
const error = ref("");

onMounted(() => {
  console.log("TestMap mounted");
  console.log("Current URL:", window.location.href);
  console.log("User Agent:", navigator.userAgent);

  // Проверяем, загружен ли ymaps3
  let attempts = 0;
  const maxAttempts = 20; // 10 секунд максимум

  const checkYMaps = () => {
    attempts++;

    if (window.ymaps3) {
      console.log("YMaps v3 found:", window.ymaps3);
      status.value = "YMaps v3 загружен";

      try {
        // Пробуем создать простую карту
        const { YMap, YMapDefaultSchemeLayer } = window.ymaps3;

        if (!YMap) {
          throw new Error("YMap class not found");
        }

        const map = new YMap(mapContainer.value, {
          location: {
            center: [55.751244, 37.618423],
            zoom: 10,
          },
        });

        const scheme = new YMapDefaultSchemeLayer();
        map.addChild(scheme);

        status.value = "Карта создана успешно";
        console.log("Map created successfully");
      } catch (err) {
        error.value = err.message;
        status.value = "Ошибка создания карты";
        console.error("Error creating map:", err);
      }
    } else if (attempts < maxAttempts) {
      console.log(
        `YMaps v3 not found, waiting... (attempt ${attempts}/${maxAttempts})`
      );
      setTimeout(checkYMaps, 500);
    } else {
      status.value = "Ошибка загрузки YMaps v3";
      error.value =
        "Недействительный API ключ. Получите новый ключ на developer.tech.yandex.ru";
      console.error("YMaps v3 load timeout - likely invalid API key");
    }
  };

  checkYMaps();
});
</script>
