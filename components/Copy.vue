<template>
  <div>
    <div class="copy" @click="handleCopy" :title="`Копировать: ${text}`">
      <svg
        width="21"
        height="26"
        viewBox="0 0 21 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.34863 8.41567H20.0357V25.9743H7.34863V8.41567Z"
          fill="currentColor"
        />
        <path
          d="M14.084 6.42578H5.39648V19.4209H0.613281V0.777344H14.084V6.42578Z"
          fill="currentColor"
        />
      </svg>
    </div>

    <!-- Баннер уведомления -->
    <Banner
      v-if="showBanner"
      message="Текст скопирован"
      :duration="3"
      @close="showBanner = false"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Banner from "./Banner.vue";

// Импортируем функцию копирования
const { copyToClipboard } = useCopyToClipboard();

// Props
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

// Состояние баннера
const showBanner = ref(false);

// Функция обработки копирования
const handleCopy = async () => {
  if (!props.text) return;

  const result = await copyToClipboard(props.text);
  if (result.success) {
    console.log("Скопировано в буфер обмена:", props.text);
    // Показываем баннер уведомления
    showBanner.value = true;
  } else {
    console.error("Ошибка копирования:", result.error);
  }
};
</script>

<style scoped>
.copy {
  cursor: pointer;
  margin: 0 10px;
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: var(--tran);
}
.copy:active {
  scale: 0.9;
}
.copy:hover path {
  fill: var(--green);
  transition: var(--tran);
}

.copy:hover path {
  fill: var(--green);
}

.copy svg {
  width: 21px;
  height: 26px;
}
</style>
