<script setup>
import { ref, watch } from "vue";
import Network from "~/components/Network.vue";
import Copy from "~/components/Copy.vue";
import FileUpload from "~/components/FileUpload.vue";
import Banner from "~/components/Banner.vue";
import Switch from "~/components/Switch.vue";
import PhoneMask from "~/components/PhoneMask.vue";

// Импортируем composable для отправки почты
const { sendEmail, isLoading, error, success, resetForm } = useEmailForm();

// Данные форм
const contactForm = ref({
  name: "",
  phone: "",
  email: "",
  message: "",
});

const partnerForm = ref({
  name: "",
  phone: "",
  email: "",
  message: "",
});

const isPolicyAccepted = ref(false);

const togglePolicy = () => {
  console.log("togglePolicy called, current value:", isPolicyAccepted.value);
  isPolicyAccepted.value = !isPolicyAccepted.value;
  console.log("togglePolicy new value:", isPolicyAccepted.value);
};

// Баннер уведомлений
const showBanner = ref(false);
const bannerMessage = ref("");
const bannerType = ref("success");

// Отслеживаем изменения error и success
watch([error, success], ([newError, newSuccess]) => {
  if (newError) {
    bannerMessage.value = newError;
    bannerType.value = "error";
    showBanner.value = true;
  } else if (newSuccess) {
    bannerMessage.value = "Заявка отправлена успешно!";
    bannerType.value = "success";
    showBanner.value = true;
  }
});

// Функции отправки форм
const handleContactSubmit = async () => {
  await sendEmail(contactForm.value);
  if (success.value) {
    contactForm.value = { name: "", phone: "", email: "", message: "" };
  }
};

const fileUpload = ref(null);

const handlePartnerSubmit = async () => {
  if (!isPolicyAccepted.value) {
    console.log("Policy not accepted");
    return;
  }

  const emailData = {
    ...partnerForm.value,
    formType: "partnership", // Тип формы для темы письма
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
  if (success.value) {
    partnerForm.value = { name: "", phone: "", email: "", message: "" };
    if (fileUpload.value && fileUpload.value.clearFile) {
      fileUpload.value.clearFile();
    }
  }
};

// Страница контактов
useHead({
  title: "Контакты - Строительство каркасных домов под ключ | TheBrus",
  meta: [
    {
      name: "description",
      content:
        "Контакты для заказа строительства каркасных домов под ключ в Москве и Московской области. Свяжитесь с нами для консультации и расчета стоимости.",
    },
    {
      name: "keywords",
      content:
        "контакты строительство каркасных домов, заказать каркасный дом, консультация строительство домов, расчет стоимости каркасного дома, строительство каркасных домов в москве контакты, строительство каркасных домов в московской области контакты, каркасные дома под ключ контакты",
    },
    {
      property: "og:title",
      content: "Контакты - Строительство каркасных домов под ключ | TheBrus",
    },
    {
      property: "og:description",
      content:
        "Контакты для заказа строительства каркасных домов под ключ в Москве и МО",
    },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "ru_RU" },
  ],
});
</script>

<template>
  <div class="main-container">
    <div class="b1">
      <div class="contact-con">
        <h1>Контакты</h1>
        <div class="conact">
          <div>
            <h3 class="tel">
              <Copy text="+7 915 178-76-11" />+7 915 178-76-11
            </h3>
            <h3 class="mail">
              <Copy text="office@thebrus.ru" />
              office@thebrus.ru
            </h3>
            <Network />
          </div>
          <div>
            <h3><Copy text="ООО ЖИ ВИ ЛЭНД" />ООО "ЖИ ВИ ЛЭНД"</h3>
            <h3><Copy text="9752182273" />ИНН 9752182273</h3>
            <button class="btn">Катрочка организации</button>
          </div>
        </div>
      </div>
      <div class="partners-con">
        <p>
          <span>Стать парнером</span><br />
          Мы предоставим прозрачные правила сотрудничества и персональное
          сопровождение на каждом этапе.
        </p>
        <form @submit.prevent="handlePartnerSubmit" class="form-parnter">
          <textarea
            v-model="partnerForm.message"
            cols="30"
            rows="3"
            placeholder="Опишите ваши условия"
            required
          ></textarea>
          <div>
            <input v-model="partnerForm.name" type="text" placeholder="Имя" />
            <PhoneMask
              v-model="partnerForm.phone"
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

    <!-- Баннер уведомлений -->
    <Teleport to="body">
      <Banner
        v-if="showBanner"
        :message="bannerMessage"
        :type="bannerType"
        :duration="3"
        @close="showBanner = false"
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
  font-size: clamp(7px, 1vw, 15px) !important;
  font-weight: 400 !important;
  color: var(--grey) !important;
  transition: var(--tran);
}
.policy-btn p span:hover {
  color: var(--green) !important;
}
.b1 {
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  flex-wrap: wrap;
}

.contact-con,
.partners-con {
  display: flex;
  flex-direction: column;
  min-width: 400px;
  margin: 10% 0;
}
.contact-con {
  width: 50%;
}
.partners-con {
  width: 40%;
}
.conact {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 5vh;
  flex-wrap: wrap;
}
.conact div {
  display: flex;
  flex-direction: column;
}
.conact div .soc {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 30px;
}
.conact div .btn {
  margin-top: 30px;
}
.conact div h3 {
  font-weight: 300;
  display: flex;
  margin: 2% 0;
}
.tel,
.mail {
  display: flex;
}

.partners-con p {
  margin-bottom: 2%;
}
.partners-con p span {
  color: #fff;
  font-size: clamp(28px, 1.5vw, 25px);
  font-weight: 500;
}

.form-parnter div {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 20px 0;
  align-items: center;
}
.form-parnter div .btn {
  width: 100%;
}
.form-parnter div .btn-file {
  background: transparent;
  padding: 0;
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

.map {
  width: 100%;
  height: 400px;
  margin-top: 2%;
  overflow: hidden;
}
.map-title h1::before {
  content: url(/svg/button/map.svg);
  margin-right: 30px;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .b1 {
    flex-direction: column;
    padding: 20px;
    min-height: auto;
  }

  .contact-con,
  .partners-con {
    min-width: auto;
    width: 100%;
    margin: 20px 0;
  }

  .contact-con h1 {
    font-size: clamp(28px, 8vw, 48px);
    text-align: center;
    margin-bottom: 30px;
  }

  .conact {
    flex-direction: column;
    gap: 30px;
    margin-top: 20px;
    align-items: center;
  }

  .conact div .h3 {
    width: 100%;
    align-items: start;
    text-align: center;
  }

  .conact div h3 {
    font-size: 18px;
    margin: 15px 0;
    justify-content: center;
  }

  .conact div .btn {
    margin-top: 20px;
    width: 100%;
    max-width: 300px;
  }

  .partners-con p {
    text-align: center;
    margin-bottom: 30px;
  }

  .partners-con p span {
    font-size: clamp(24px, 6vw, 32px);
  }

  .form-parnter {
    margin-top: 20px;
  }

  .form-parnter textarea {
    font-size: 16px;
    padding: 15px;
    margin-bottom: 15px;
    min-height: 100px;
  }

  .form-parnter div {
    flex-direction: column;
    gap: 15px;
  }

  .form-parnter input {
    font-size: 16px;
    padding: 15px;
  }

  .btn {
    padding: 15px 30px;
    font-size: 16px;
    width: 100%;
    min-height: 48px;
    touch-action: manipulation;
  }

  .policy-btn {
    justify-content: center;
    margin-top: 15px;
  }

  .policy-btn p {
    font-size: 14px;
    text-align: center;
  }

  .b6 {
    padding: 20px;
  }

  .map-title {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
  }

  .map-title h1 {
    font-size: clamp(20px, 5vw, 28px);
    margin-bottom: 15px;
  }

  .map-title p {
    font-size: 14px;
    text-align: center;
  }

  .map {
    height: 300px;
    margin-top: 20px;
  }

  .map-title h1::before {
    margin-right: 10px;
  }
}
</style>
