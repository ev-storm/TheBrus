<template>
  <div class="footer-con">
    <footer class="footer">
      <div class="footer-logo">
        <img src="/svg/logo/logo-nav.svg" alt="" />
        <p>Все права защищены<br />2025</p>
      </div>
      <div class="footer-nav">
        <div class="nav-item">
          <ul>
            <NuxtLink class="main-link" to="/portfolio">Каталог</NuxtLink>
            <li>
              <NuxtLink class="sub-link" to="/portfolio?tab=order"
                >Заказать готовое решение</NuxtLink
              >
            </li>
            <li>
              <NuxtLink class="sub-link" to="/portfolio?tab=portfolio"
                >Выполненые проекты</NuxtLink
              >
            </li>
          </ul>
          <ul>
            <NuxtLink class="main-link" to="/constructor">Конструктор</NuxtLink>
            <li>
              <NuxtLink class="sub-link" to="/constructor"
                >Создать индивидуальный проект</NuxtLink
              >
            </li>
          </ul>
        </div>
        <div class="nav-item">
          <ul>
            <NuxtLink class="main-link" to="/contacts">Контакты</NuxtLink>
            <li>
              <NuxtLink class="sub-link" to="/contacts"
                >Реквезиты компании</NuxtLink
              >
            </li>
            <li>
              <NuxtLink class="sub-link" to="/contacts">Наша команда</NuxtLink>
            </li>
            <li>
              <NuxtLink class="sub-link" to="/contacts">Локация</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="nav-item">
          <ul>
            <NuxtLink class="main-link" to="/">О компании</NuxtLink>
            <li>
              <NuxtLink class="sub-link" to="/">Наш подход</NuxtLink>
            </li>
            <li>
              <NuxtLink class="sub-link" to="/">Документация</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-form">
        <form @submit.prevent="handleSubmit" class="form-mini">
          <input v-model="form.name" type="text" placeholder="Имя" required />
          <PhoneMask
            v-model="form.phone"
            placeholder="Телефон"
            input-class="form-input"
          />
          <button type="submit" class="btn" :disabled="isLoading">
            {{ isLoading ? "Отправка..." : "Отправить" }}
          </button>
        </form>
        <Network />
      </div>
    </footer>

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

<script setup>
import { ref, watch } from "vue";
import Network from "./Network.vue";
import Banner from "./Banner.vue";
import PhoneMask from "./PhoneMask.vue";
import { useEmailForm } from "~/composables/useEmailForm";

const { sendEmail, isLoading, error, success } = useEmailForm();

const form = ref({
  name: "",
  phone: "",
});

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

const handleSubmit = async () => {
  const emailData = {
    name: form.value.name,
    phone: form.value.phone,
    message: "Клиент оставил заявку на обратную связь через футер сайта.",
    email: "", // Нет email поля в форме
    formType: "feedback", // Тип формы для темы письма
  };

  await sendEmail(emailData);

  // Сброс формы при успешной отправке
  if (success.value) {
    form.value = {
      name: "",
      phone: "",
    };
  }
};
</script>

<style scoped>
.footer-con {
  width: 100%;
  display: flex;
  justify-content: center;
  background: #00000033;
  overflow: hidden;
}
.footer {
  width: 100%;
  display: flex;
  height: 30vh;
  max-width: 1700px;
  justify-content: space-between;
  margin-top: 5vh;
  padding: 0 2%;
}
.footer-logo {
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  padding: 1% 2%;
}
.footer-logo img {
  width: 80%;
}
.footer-logo p {
  color: #ffffff85;
  font-size: 15px;
}
.footer-nav {
  display: flex;
  width: 50%;
  justify-content: space-between;
  align-items: stretch;
}
.sub-link {
  color: #a0a0a0;
  font-size: clamp(12px, 0.8vw, 15px);
  font-weight: 400;
}

.nav-item {
  display: flex;
  flex-direction: column;
}
.nav-item ul {
  margin-bottom: 20px;
}
.footer-form {
  width: 20%;
}
.footer-form input {
  margin: 8px 0;
  padding: 0 30px;
}

.footer-form input::placeholder {
  margin: 8px 0;
  font-size: clamp(14px, 0.8vw, 14px);
}
.footer-form button {
  width: 100%;
  margin: 8px 0;
}
.main-link {
  transition: var(--tran);
}
.main-link:hover {
  color: var(--green);
}
.sub-link {
  transition: var(--tran);
}
.sub-link:hover {
  color: #fff;
}

.notification {
  margin-top: 10px;
  padding: 8px;
  border-radius: 4px;
  font-size: 11px;
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
@media (max-width: 768px) {
  .footer-con {
    flex-direction: column;
  }
  .footer {
    flex-direction: column;
    height: fit-content;
  }
  .footer-logo {
    width: 100%;
    align-items: center;
    padding: 10% 2%;
    text-align: center;
  }
  .footer-nav {
    width: 100%;
    flex-direction: column;
    padding: 0 20%;
  }
  .footer-form {
    width: 100%;
    padding: 0 10%;
  }
  .footer-form input {
    margin: 8px 0;
    padding: 10px 30px;
    font-size: 16px;
  }
  .footer-form button {
    width: 100%;
    margin: 10px 0;
    font-size: 16px;
  }
  .soc[data-v-0c5fda1c] {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }
  .footer-logo p[data-v-3506faf6] {
    color: #ffffff85;
    font-size: 15px;
    display: none;
  }
}
</style>
