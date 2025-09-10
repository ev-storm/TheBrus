<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import YandexMap from "~/components/YandexMap.vue";

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
    <div class="b2">
      <h1>Уют начинается с идеи</h1>
      <div class="b2-text-con">
        <div class="b2-text">
          <p>
            Более <span>3 проектов</span> по всей стране. <br />Сопровождение
            проекта мечты от идеи до реализации.
          </p>
          <button class="btn">Сделать шаг к мечте</button>
        </div>
        <div class="b2-img">
          <img src="/public/img/index/1.png" alt="" />
        </div>
      </div>
    </div>
    <div class="b3">
      <div class="title-con">
        <div class="h1">
          <img src="/public/img/index/3.svg" alt="" />
        </div>
        <p>
          — современная технологичная компания с 5-летним опытом работы на рынке
          Москвы и Московской области.
        </p>
      </div>
      <div class="b3-text">
        <p>
          Мы специализируемся на проектировании и строительстве экологичных
          загородных домов под ключ.<br /><br />Ключевое - мы приступаем к
          работе на следующий же день после подписания договора.
        </p>
      </div>
      <img class="b3-back" src="/public/img/index/2.svg" alt="" />
    </div>
    <div class="b4">
      <div class="b4-title">
        <h3>Наш подход</h3>
      </div>
      <p>
        Мы создали комплексное решение для комфортного строительства без
        необходимости вашего постоянного контроля. <br /><br />Вам не нужно
        ежедневно бывать на объекте и вникать в технические нюансы, так как мы
        гарантируем:
      </p>
      <div class="b4-slider">
        <Slider />
      </div>
    </div>
    <div class="b5">
      <h1>
        Знаете, каким должен быть ваш дом? <br />
        Мы знаем, как его построить.
      </h1>
      <div class="b5-content">
        <div class="b5-text">
          <p>
            Наши специалисты реализуют любые ваши идеи и дадут профессиональные
            советы. <br /><br />Опишите или загрузите ваш проект.
          </p>
          <form action="" class="form-project">
            <textarea
              cols="30"
              rows="5"
              placeholder="Опишите ваш проект"
            ></textarea>
            <div>
              <input type="text" placeholder="Имя" />
              <input type="tel" placeholder="Телефон" />
            </div>
            <div>
              <button type="submit" class="btn">Отправить</button>
              <button class="btn btn-file">Прикрепить файл</button>
            </div>
          </form>
        </div>
        <div class="b5-img">
          <img src="/public/img/index/5.png" alt="" />
        </div>
      </div>
    </div>
    <div class="b6">
      <div class="map-title">
        <h1>Наш офис</h1>
        <p>
          <svg
            class="copy"
            width="21"
            height="26"
            viewBox="0 0 21 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.34863 8.41567H20.0357V25.9743H7.34863V8.41567Z"
              fill="white"
            />
            <path
              d="M14.084 6.42578H5.39648V19.4209H0.613281V0.777344H14.084V6.42578Z"
              fill="white"
            />
          </svg>

          Варсонофьевский переулок, 10с2, Москва, 107031<br />
          <span>09:00-19:00 Пн-Пт</span>
        </p>
      </div>
      <div class="map">
        <YandexMap />
      </div>
    </div>
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

  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding-left: 5%;
  padding-top: 10vh;
}
.b2 h1 {
  text-transform: none;
  font-size: clamp(32px, 10vw, 110px);
  font-weight: 300;
}
.b2-text-con {
  display: flex;
  align-items: start;
}
.b2-text p {
  font-weight: 400;
  margin: 20% 0;
}
.b2-text p span {
  color: var(--green);
}
.b2-text {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.b2-img {
  width: 70%;
}
.b2-img img {
  width: 100%;
}
.b3 {
  width: 100%;
  min-height: 90vh;
  position: relative;
}
.b3-back {
  position: absolute;
  right: 0;
  top: -5%;
  width: 100%;
  height: auto;
  z-index: -1;
}
.title-con {
  width: 100%;
  display: flex;
  height: 30vh;
  align-items: end;
}
.title-con .h1 {
  width: 30%;
  display: flex;
  justify-content: end;
}
.title-con p {
  width: 40%;
  padding-left: 2%;
}
.b3-text {
  width: 40%;
  display: flex;
  height: 60vh;
  align-items: center;
  justify-content: center;
  padding-left: 5%;
}
.b4 {
  width: 100%;
  margin: 10% 0;
}
.b4-title {
  width: 100%;
  display: flex;
  justify-content: start;
}
.b4-title h3 {
  background: var(--green);
  color: var(--back);
  padding: 0 50px 0 5%;
}
.b4 p {
  width: 80%;
  margin: 5% 0;
  padding: 0 5%;
  line-height: 2;
}

.b4-slider {
  width: 100%;
}
.b5 {
  width: 100%;
  min-height: 80vh;
}
.b5 h1 {
  text-transform: none;
  padding: 0 5%;
}
.b5-text {
  width: 50%;
  padding: 0 5%;
}
.b5-text p {
  margin: 6% 0;
}
.b5-img {
  width: 50%;
}
.b5-img img {
  width: 100%;
  transform: translateY(-20%);
}
.b5-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-project div {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 20px 0;
}
.form-project div .btn {
  width: 100%;
}
.form-project div .btn-file {
  background: transparent;
  padding: 0;
}
.b6 {
  width: 100%;
  min-height: 80vh;
}
.map-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
}
.map-title p {
  text-align: end;
}

.map-title p span {
  color: #7e7e7e;
}
.copy {
  margin: 0 10px;
  transition: var(--tran);
}
.copy path {
  cursor: pointer;
  transition: var(--tran);
}
.copy:hover path {
  fill: var(--green);
}
.copy:active {
  scale: 0.8;
}

.map {
  width: 100%;
  height: 400px;
  margin-top: 2%;
  overflow: hidden;
}
.map-title h1::before {
  content: url(/public/svg/button/map.svg);
}
</style>
