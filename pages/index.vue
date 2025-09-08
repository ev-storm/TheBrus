<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Главная страница
useHead({
  title: "Главная - TheBrus",
  meta: [
    {
      name: "description",
      content:
        "Главная страница проекта TheBrus - современный веб-сайт на Nuxt.js",
    },
    { name: "keywords", content: "Nuxt, Vue, SSR, веб-разработка" },
    { property: "og:title", content: "Главная - TheBrus" },
    { property: "og:description", content: "Главная страница проекта TheBrus" },
    { property: "og:type", content: "website" },
  ],
});

// Слайдшоу изображений
const currentImageIndex = ref(0);
const images = [
  "/img/1.jpg",
  "/img/2.jpg",
  "/img/3.jpg",
  "/img/4.jpg",
  "/img/5.jpg",
];

let slideInterval = null;

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

onMounted(() => {
  slideInterval = setInterval(nextImage, 10000); // 10 секунд
});

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
});
</script>

<template>
  <div class="main-container">
    <div class="b1">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="background-layer"
        :class="{ active: index === currentImageIndex }"
        :style="{ backgroundImage: `url(${image})` }"
      ></div>
      <div class="content">
        <h1>
          Наследие, <br />
          в котором живёт любовь
        </h1>
        <button class="btn trigger">Присоедениться</button>
      </div>
    </div>
    <div class="b2"></div>
  </div>
</template>
<style scoped>
.b1 {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 2s ease-in-out;
  z-index: 1;
}

.background-layer.active {
  opacity: 1;
}

.content {
  position: relative;
  z-index: 2;
}

.content h1 {
  font-size: var(--fs-0);
}

.content button {
  margin: 5% 0;
}

.content .trigger {
  cursor: pointer;
  transition: var(--tran);
}

.b2 {
  width: 100%;
  height: 180vh;
}
</style>
