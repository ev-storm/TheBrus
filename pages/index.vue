<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import YandexMap from "~/components/YandexMap.vue";
import SliderCartProduct from "~/components/SliderCartProduct.vue";
import FileUpload from "~/components/FileUpload.vue";
import Banner from "~/components/Banner.vue";
import Switch from "~/components/Switch.vue";
import PhoneMask from "~/components/PhoneMask.vue";
import { useEmailForm } from "~/composables/useEmailForm";
import { useCopyToClipboard } from "~/composables/useCopyToClipboard";
import { useMenu } from "~/composables/useMenu";
import { useMenuManager } from "~/composables/useMenuManager";

// Главная страница
useHead({
  title: "TheBrus - Строительство каркасных домов под ключ в Москве и МО",
  meta: [
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
      content: "TheBrus - Строительство каркасных домов под ключ в Москве и МО",
    },
    {
      property: "og:description",
      content:
        "Строительство каркасных домов под ключ в Москве и Московской области. Каркасно-щитовые дома, дома из клееного бруса. Недорого, качественно, с гарантией.",
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "ru_RU" },
  ],
});

// Слайдшоу изображений
const currentImageIndex = ref(0);
const images = [
  "/img/index/title/1.png",
  "/img/index/title/2.png",
  "/img/index/title/3.png",
  "/img/index/title/4.png",
  "/img/index/title/5.png",
  "/img/index/title/6.png",
  "/img/index/title/7.png",
];

// Копирование адреса
const { copyToClipboard } = useCopyToClipboard();
const showBanner = ref(false);
const addressText = "Варсонофьевский переулок, 10с2, Москва, 107031";

// Правое меню
const { openMenu: openRightMenu } = useMenu("right");
const { openRightMenu: openRightMenuManager } = useMenuManager();

const handleCopyAddress = async () => {
  const result = await copyToClipboard(addressText);
  if (result.success) {
    showBanner.value = true;
  }
};

// Анимация баннера календаря
const isBannerVisible = ref(false);
const counterValue = ref(200);
const b1Element = ref(null);

let slideInterval = null;
let observer = null;

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

// Анимация счетчика
const animateCounter = () => {
  const startValue = 200;
  const endValue = 70;
  const duration = 2000; // 4 секунды
  const startTime = Date.now();

  const updateCounter = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function для плавной анимации
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    counterValue.value = Math.round(
      startValue - (startValue - endValue) * easeOutCubic
    );

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  };

  requestAnimationFrame(updateCounter);
};

// Сброс баннера и счетчика
const resetBanner = () => {
  isBannerVisible.value = false;
  counterValue.value = 200;
};

// Настройка Intersection Observer
const setupObserver = () => {
  if (!b1Element.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // Элемент вышел за пределы экрана
          resetBanner();
        } else {
          // Элемент попал в область экрана
          if (!isBannerVisible.value) {
            // Запускаем анимацию баннера через 2 секунды
            setTimeout(() => {
              isBannerVisible.value = true;
              // Запускаем анимацию счетчика с небольшой задержкой
              setTimeout(animateCounter, 500);
            }, 1000);
          }
        }
      });
    },
    {
      threshold: 0.1, // Срабатывает когда 10% элемента видно
      rootMargin: "0px",
    }
  );

  observer.observe(b1Element.value);
};

onMounted(() => {
  slideInterval = setInterval(nextImage, 10000); // 10 секунд

  // Настраиваем observer для отслеживания видимости b1
  nextTick(() => {
    setupObserver();
  });
});

// Логика формы проекта
const { sendEmail, isLoading, error, success } = useEmailForm();

const projectForm = ref({
  name: "",
  phone: "",
  message: "",
});

const isPolicyAccepted = ref(false);

const togglePolicy = () => {
  console.log("togglePolicy called, current value:", isPolicyAccepted.value);
  isPolicyAccepted.value = !isPolicyAccepted.value;
  console.log("togglePolicy new value:", isPolicyAccepted.value);
};

const fileUpload = ref(null);

// Баннер уведомлений формы
const showFormBanner = ref(false);
const formBannerMessage = ref("");
const formBannerType = ref("success");

// Отслеживаем изменения error и success
watch([error, success], ([newError, newSuccess]) => {
  if (newError) {
    formBannerMessage.value = newError;
    formBannerType.value = "error";
    showFormBanner.value = true;
  } else if (newSuccess) {
    formBannerMessage.value = "Заявка отправлена успешно!";
    formBannerType.value = "success";
    showFormBanner.value = true;
  }
});

const handleProjectSubmit = async () => {
  if (!isPolicyAccepted.value) {
    console.log("Policy not accepted");
    return;
  }

  const emailData = {
    name: projectForm.value.name,
    phone: projectForm.value.phone,
    message: projectForm.value.message,
    email: "", // Нет email поля в форме
    formType: "project", // Тип формы для темы письма
  };

  // Получаем данные файла если есть
  const fileData =
    fileUpload.value && fileUpload.value.selectedFile
      ? {
          selectedFile: fileUpload.value.selectedFile,
          fileToBase64: fileUpload.value.fileToBase64,
        }
      : null;

  await sendEmail(emailData, fileData);

  // Сброс формы при успешной отправке
  if (success.value) {
    projectForm.value = {
      name: "",
      phone: "",
      message: "",
    };
    if (fileUpload.value && fileUpload.value.clearFile) {
      fileUpload.value.clearFile();
    }
  }
};

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
  if (observer) {
    observer.disconnect();
  }
});
</script>

<template>
  <div class="main-container">
    <div class="b1" ref="b1Element">
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
        <button
          class="btn trigger"
          @click="
            (event) => {
              event.stopPropagation();
              openRightMenuManager();
            }
          "
        >
          Присоедениться
        </button>
      </div>
      <div class="banner-calendar" :class="{ visible: isBannerVisible }">
        <p>До вашего готового дома осталось</p>
        <div class="score">
          <span>{{ Math.floor(counterValue / 100) }}</span>
          <span>{{ Math.floor((counterValue % 100) / 10) }}</span>
          <span>{{ counterValue % 10 }}</span>
        </div>
        <p>Дней</p>
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
          <img src="/img/index/1.png" alt="" />
        </div>
      </div>
    </div>
    <div class="b3">
      <div class="title-con">
        <div class="h1">
          <img src="/img/index/3.svg" alt="" />
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
      <img class="b3-back" src="/img/index/2.svg" alt="" />
    </div>
    <div class="b4">
      <div class="b4-title">
        <h1>Наш подход</h1>
      </div>
      <p>
        Мы создали комплексное решение для комфортного строительства без
        необходимости вашего постоянного контроля. <br />Вам не нужно ежедневно
        бывать на объекте и вникать в технические нюансы, так как мы
        гарантируем:
      </p>
      <div class="b4-slider">
        <Slider />
      </div>
    </div>
    <SliderCartProduct />
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
          <form @submit.prevent="handleProjectSubmit" class="form-project">
            <textarea
              v-model="projectForm.message"
              cols="30"
              rows="5"
              placeholder="Опишите ваш проект"
              required
            ></textarea>
            <div>
              <input
                v-model="projectForm.name"
                type="text"
                placeholder="Имя"
                required
              />
              <PhoneMask
                v-model="projectForm.phone"
                placeholder="Телефон"
                input-class="form-input"
              />
            </div>
            <div class="btn-con">
              <div class="btn-file">
                <button
                  type="submit"
                  class="btn"
                  :disabled="!isPolicyAccepted || isLoading"
                  :style="{ opacity: isPolicyAccepted && !isLoading ? 1 : 0.5 }"
                >
                  {{ isLoading ? "Отправка..." : "Отправить" }}
                </button>
                <FileUpload ref="fileUpload" />
              </div>
              <div class="policy-btn" @click="togglePolicy">
                <Switch v-model="isPolicyAccepted" @click.stop />
                <p>Ознакомлен c <span>политикой конфиденциальности</span></p>
              </div>
            </div>
          </form>
        </div>
        <div class="b5-img">
          <img src="/img/index/5.png" alt="" />
        </div>
      </div>
    </div>
    <div class="b6">
      <div class="map-title">
        <h1>Центральный офис</h1>
        <p>
          <Copy text="Варсонофьевский переулок, 10с2, Москва, 107031" />

          Варсонофьевский переулок, 10с2, Москва, 107031<br />
          <span>09:00-19:00 Пн-Пт</span>
        </p>
      </div>
      <div class="map">
        <YandexMap />
      </div>
    </div>

    <!-- Баннер уведомления -->
    <Banner
      v-if="showBanner"
      message="Адрес скопирован"
      :duration="3"
      @close="showBanner = false"
    />

    <!-- Баннер уведомлений формы -->
    <Teleport to="body">
      <Banner
        v-if="showFormBanner"
        :message="formBannerMessage"
        :type="formBannerType"
        :duration="3"
        @close="showFormBanner = false"
      />
    </Teleport>
  </div>
</template>
<style scoped>
.btn-con {
  display: flex;
  flex-direction: column;
}
.btn-file {
  width: 100%;
  margin: 0 !important;
}
.policy-btn {
  margin: 0 !important;
  width: fit-content;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}
.policy-btn p {
  font-size: clamp(7px, 1vw, 15px);
  margin: 0 !important;
}
.policy-btn .switch {
  margin: 0 !important;
}

.policy-btn p span {
  cursor: pointer;
}
.policy-btn p span:hover {
  color: var(--green);
}
.b1 {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.banner-calendar {
  position: absolute;
  right: -100%;
  bottom: 0;
  width: clamp(300px, 25%, 450px);
  height: 250px;
  background: var(--green);
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  box-shadow: 0 0 50px #000;
  transition: right 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.banner-calendar.visible {
  right: 0;
}
.banner-calendar p {
  color: #fff;
  font-weight: 500;
}

.score {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 4%;
}
.score span {
  font-family: var(--font-netflix);
  font-size: clamp(120px, 10vw, 160px);
  color: var(--green);
  background: #fff;
  line-height: 1;
  padding: 0 4%;
}

.calendar-day {
  display: flex;
  /* justify-content: end;
  transform: translateY(-26px);
  line-height: 0; */
}
.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-attachment: fixed;
  background-position: center;
  background-size: 100%;
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
  width: 100%;
  margin: 5% 0;
  padding: 0 5%;
  line-height: 2;
  text-align: end;
  transform: translateY(-100%);
}

.b4-slider {
  width: 100%;
}

.b4-slider .mySwiper {
  padding: 0 10px;
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
  align-items: center;
}
.form-project div .btn {
  width: 100%;
}
.form-project div .btn-file {
  background: transparent;
  padding: 0;
}

.notification {
  margin-top: 15px;
  padding: 10px;
  border-radius: 0;
  font-size: 12px;
  text-align: center;
}

.notification.error {
  background: rgba(255, 68, 68, 0.1);
  color: #ff4444;
  border: 1px solid rgba(255, 68, 68, 0.3);
}

.notification.success {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}
.b6 {
  width: 100%;
}
.map-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
}
.map-title p {
  text-align: end;
  color: #fff;
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
  content: url(/svg/button/map.svg);
  margin-right: 20px;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .b1 {
    height: 100vh;
    padding: 20px;
  }

  .banner-calendar {
    width: 90% !important;
    height: 150px !important;
    bottom: 15px !important;
  }
  .banner-calendar.visible {
    right: 5%;
  }

  .score span {
    font-size: 70px !important;
    padding: 0 2%;
  }

  .background-layer {
    background-attachment: scroll;
    background-size: cover;
  }

  .content h1 {
    font-size: 50px !important;
    text-align: start;
    margin-bottom: 20px;
  }

  .content button {
    width: 100%;
    max-width: 300px;
    padding: 15px 30px;
    font-size: 16px;
  }
  .title-con .h1 img {
    width: 90%;
  }
  .b2 {
    padding: 40px 20px;
    min-height: auto;
  }

  .b2 h1 {
    font-size: clamp(28px, 8vw, 48px);
    margin-bottom: 30px;
  }

  .b2-text-con {
    flex-direction: column;
  }

  .b2-text {
    width: 100%;

    margin-bottom: 30px;
  }

  .b2-text p {
    margin: 20px 0;
    font-size: 16px;
  }

  .b2-img {
    width: 100%;
    max-width: 400px;
  }

  .b3 {
    padding: 40px 20px;
    min-height: auto;
  }

  .b3-back {
    display: none;
  }

  .title-con {
    flex-direction: column;
    height: auto;
    align-items: center;

    margin-bottom: 30px;
  }

  .title-con .h1 {
    width: 100%;
    justify-content: center;
    margin-bottom: 20px;
  }

  .title-con p {
    width: 100%;
    padding: 0;
    font-size: 16px;
  }

  .b3-text {
    width: 100%;
    height: auto;
    padding: 0;
  }

  .b3-text p {
    font-size: 16px;
    line-height: 1.6;
  }

  .b4 {
    padding: 40px 20px;
  }

  .b4-title h3 {
    padding: 15px 20px;
    font-size: 20px;
  }

  .b4 p {
    transform: none;
    font-size: 16px;
    margin: 20px 0;
    padding: 0;
    text-align: start;
  }

  .b4-slider {
    margin-top: 20px;
  }

  .b4-slider .mySwiper {
    padding: 0;
  }

  .b5 {
    padding: 40px 20px;
    min-height: auto;
  }

  .b5 h1 {
    font-size: clamp(24px, 6vw, 36px);
    padding: 0;
    margin-bottom: 30px;
  }

  .b5-content {
    flex-direction: column;
  }

  .b5-text {
    width: 100%;
    padding: 0;
    margin-bottom: 30px;
  }

  .b5-text p {
    font-size: 16px;

    margin: 20px 0;
  }

  .b5-img {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  .b5-img img {
    transform: none;
  }

  .form-project {
    margin-top: 20px;
  }

  .form-project textarea {
    font-size: 16px;
    padding: 15px;
    margin-bottom: 15px;
  }

  .form-project div {
    flex-direction: column;
    gap: 15px;
  }

  .form-project input {
    font-size: 16px;
    padding: 15px;
  }

  .policy-btn {
    justify-content: center;
    margin-top: 15px;
  }

  .policy-btn p {
    font-size: 14px;
  }

  .b6 {
    padding: 40px 20px;
  }

  .map-title {
    flex-direction: column;
    align-items: center;

    margin-bottom: 20px;
  }

  .map-title h1 {
    font-size: clamp(20px, 5vw, 28px);
    margin-bottom: 15px;
  }

  .map-title p {
    font-size: 14px;
  }

  .map {
    height: 300px;
    margin-top: 20px;
  }

  .map-title h1::before {
    margin-right: 10px;
  }
}

/* Дополнительные улучшения для мобильных */
@media (max-width: 768px) {
  /* Улучшение читаемости текста */
  .b2-text p,
  .b3-text p,
  .b4 p,
  .b5-text p {
    line-height: 1.6;
  }

  /* Оптимизация кнопок для касания */
  .btn {
    min-height: 48px;
    touch-action: manipulation;
  }

  /* Улучшение формы */
  .form-project textarea {
    min-height: 120px;
  }

  .form-project input,
  .form-project textarea {
    border-radius: 0;
  }

  /* Оптимизация баннера календаря */
  .banner-calendar p {
    font-size: 14px;

    padding: 0 10px;
  }

  /* Улучшение навигации */
  .content button.trigger {
    position: relative;
    z-index: 10;
  }

  /* Оптимизация изображений */
  .b2-img img,
  .b5-img img {
    border-radius: 0;
  }

  /* Улучшение отступов */
  .main-container {
    overflow-x: hidden;
  }
}
</style>
