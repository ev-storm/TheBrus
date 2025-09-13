<template>
  <div class="form-nav">
    <form @submit.prevent="handleSubmit" class="form-container">
      <div class="form-field" v-if="selectedProject">
        <input
          v-model="form.projectName"
          type="text"
          :placeholder="selectedProject.title"
          class="form-input project-input"
          readonly
        />
      </div>
      <div class="form-field">
        <input
          v-model="form.name"
          type="text"
          placeholder="Имя"
          class="form-input"
          required
        />
      </div>
      <div class="form-field">
        <PhoneMask
          v-model="form.phone"
          placeholder="+7"
          input-class="form-input"
        />
      </div>
      <button
        type="submit"
        class="btn form-button"
        :disabled="!isPolicyAccepted || isLoading"
        :style="{ opacity: isPolicyAccepted && !isLoading ? 1 : 0.5 }"
      >
        {{ isLoading ? "Отправка..." : "Отправить" }}
      </button>
    </form>
    <div class="policy-btn" @click="togglePolicy">
      <Switch v-model="isPolicyAccepted" @click.stop />
      <p>Ознакомлен c <br /><span>политикой конфиденциальности</span></p>
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

<script setup>
import { ref, watch } from "vue";
import { useSelectedProject } from "~/composables/useSelectedProject";
import { useEmailForm } from "~/composables/useEmailForm";
import Banner from "~/components/Banner.vue";
import Switch from "~/components/Switch.vue";
import PhoneMask from "~/components/PhoneMask.vue";

const { selectedProject } = useSelectedProject();
const { sendEmail, isLoading, error, success, resetForm } = useEmailForm();

const form = ref({
  name: "",
  phone: "",
  projectName: "",
});

const isPolicyAccepted = ref(false);

const togglePolicy = () => {
  console.log(
    "FormNav togglePolicy called, current value:",
    isPolicyAccepted.value
  );
  isPolicyAccepted.value = !isPolicyAccepted.value;
  console.log("FormNav togglePolicy new value:", isPolicyAccepted.value);
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

const handleSubmit = async () => {
  if (!isPolicyAccepted.value) {
    console.log("Policy not accepted");
    return;
  }

  // Подготовка данных для отправки
  const emailData = {
    name: form.value.name,
    phone: form.value.phone,
    message: selectedProject.value
      ? `Клиент заинтересован в проекте "${selectedProject.value.title}" и хочет получить консультацию.`
      : "Клиент оставил заявку на обратную связь.",
    email: "", // Нет email поля в форме
    formType: "feedback", // Тип формы для темы письма
  };

  // Отправка письма
  await sendEmail(emailData);

  // Сброс формы при успешной отправке
  if (success.value) {
    form.value = {
      name: "",
      phone: "",
      projectName: "",
    };
    isPolicyAccepted.value = false;
  }
};
</script>

<style scoped>
.form-nav {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.policy-btn {
  display: flex;
  margin-top: 20px;
  text-align: end;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
}
.policy-btn p {
  font-size: 10px;
  text-align: end;
}
.policy-btn p span {
  cursor: pointer;
  transition: var(--tran);
}
.policy-btn p span:hover {
  color: var(--green);
}

.form-container {
  width: 100%;
  max-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-container button {
  width: 100%;
}

.form-field {
  width: 100%;
}

.form-input {
  width: 100%;
  padding: 0px 20px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0;
  color: var(--font);
  font-family: var(--font-primary);
  font-size: var(--fs-p);
  font-weight: 400;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  margin: 0;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
}

.form-input:focus {
  border-color: var(--green);
  background: rgba(255, 255, 255, 0.08);
}

.form-input:hover {
  border-color: rgba(255, 255, 255, 0.4);
}

.project-input {
  background: transparent !important;
  border-color: transparent !important;
}

.project-input::placeholder {
  color: #fff !important;
  font-weight: 500;
}

.notification {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
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
@media (max-width: 768px) {
  .form-input {
    width: 100%;
    padding: 5px 20px;
    border: none;
  }
}
</style>
