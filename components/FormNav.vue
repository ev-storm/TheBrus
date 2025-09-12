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
        <input
          v-model="form.phone"
          type="tel"
          placeholder="+7"
          class="form-input"
          required
        />
      </div>
      <button
        type="submit"
        class="btn form-button"
        :disabled="!isPolicyAccepted"
        :style="{ opacity: isPolicyAccepted ? 1 : 0.5 }"
      >
        Отправить
      </button>
    </form>
    <div class="policy-btn">
      <Switch v-model="isPolicyAccepted" />
      <p>Ознакомлен c <br /><span>политикой конфиденциальности</span></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSelectedProject } from "~/composables/useSelectedProject";

const { selectedProject } = useSelectedProject();

const form = ref({
  name: "",
  phone: "",
  projectName: "",
});

const isPolicyAccepted = ref(false);

const handleSubmit = () => {
  if (!isPolicyAccepted.value) {
    console.log("Policy not accepted");
    return;
  }
  console.log("Form submitted:", form.value);
  // Здесь можно добавить логику отправки формы
  // Например, отправка на сервер или уведомление
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
</style>
