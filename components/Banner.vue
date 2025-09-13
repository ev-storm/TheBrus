<template>
  <div
    v-if="isVisible"
    class="banner"
    :class="{
      'banner--closing': isClosing,
      'banner--error': type === 'error',
    }"
  >
    <div class="banner-content">
      <h1 class="banner-title">{{ message }}</h1>

      <button class="banner-close" @click="closeBanner" :disabled="isClosing">
        <span v-if="duration === 0" class="banner-ok-text">ОК</span>
        <span v-else class="banner-close-icon">
          <svg class="banner-progress-ring" width="40" height="40">
            <circle
              class="banner-progress-ring-circle"
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              stroke-width="2"
            />
            <circle
              class="banner-progress-ring-progress"
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="rgba(255, 255, 255, 0.8)"
              stroke-width="2"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="progressOffset"
              stroke-linecap="round"
            />
          </svg>
          <span class="banner-close-cross">×</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
// v2.0 - Упрощенная версия без обратного отсчета
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 0, // 0 = не закрывается автоматически
  },
  type: {
    type: String,
    default: "success", // 'success' или 'error'
  },
});

const emit = defineEmits(["close"]);

const isVisible = ref(false);
const isClosing = ref(false);

// Переменные для прогресс-круга
const startTime = ref(0);
const progressOffset = ref(0);
const intervalId = ref(null);

// Вычисляемые свойства
const circumference = computed(() => 2 * Math.PI * 18); // радиус 18

// Функция обновления прогресса
const updateProgress = () => {
  if (!startTime.value) return;

  const elapsed = Date.now() - startTime.value;
  const progress = Math.min(elapsed / (props.duration * 1000), 1);
  progressOffset.value = circumference.value * (1 - progress);

  // Останавливаем когда прогресс завершен
  if (progress >= 1) {
    stopProgress();
  }
};

// Функция запуска прогресса
const startProgress = () => {
  if (props.duration <= 0) return;

  startTime.value = Date.now();
  progressOffset.value = circumference.value;

  // Используем requestAnimationFrame для более плавной анимации
  const animate = () => {
    updateProgress();
    if (intervalId.value) {
      intervalId.value = requestAnimationFrame(animate);
    }
  };

  intervalId.value = requestAnimationFrame(animate);
};

// Функция остановки прогресса
const stopProgress = () => {
  if (intervalId.value) {
    cancelAnimationFrame(intervalId.value);
    intervalId.value = null;
  }
};

const closeBanner = () => {
  if (isClosing.value) return;

  isClosing.value = true;
  stopProgress();

  // Анимация закрытия
  setTimeout(() => {
    isVisible.value = false;
    emit("close");
  }, 300); // время анимации
};

onMounted(() => {
  // Плавное появление баннера
  setTimeout(() => {
    isVisible.value = true;
  }, 50);

  // Запускаем прогресс сразу, но с небольшой задержкой для появления
  if (props.duration > 0) {
    setTimeout(() => {
      startProgress();
    }, 100); // Небольшая задержка для плавного появления

    // Автозакрытие через указанное время
    setTimeout(() => {
      closeBanner();
    }, props.duration * 1000);
  }
});

onUnmounted(() => {
  stopProgress();
});
</script>

<style scoped>
.banner {
  position: fixed;
  padding: 0 0 0 20px;
  bottom: 10%;
  left: 0px;
  width: fit-content;
  min-width: 200px;
  max-width: 700px;
  height: 5vh;
  min-height: 50px;
  background: var(--green);
  border-radius: 0px;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transform: translateX(-100%);
  transition: transform 0.5s ease-in-out;
  opacity: 0;
  animation: slideIn 0.5s ease-out forwards;
}

.banner--error {
  background: #f44336;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.banner--closing {
  transform: translateX(-100%);
}

.banner-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.banner-title {
  color: white;
  font-size: clamp(14px, 2vw, 18px);
  font-weight: 500;
  margin: 0;
  flex: 1;
  line-height: 1.3;
  padding-right: 20px;
}

.banner-close {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.banner-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.banner-close:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.banner-close-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.banner-progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
}

.banner-progress-ring-circle {
  transition: none;
}

.banner-progress-ring-progress {
  transition: none;
}

.banner-close-cross {
  position: relative;
  z-index: 1;
  color: white;
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}

.banner-ok-text {
  color: white;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

/* Адаптивность */
@media (max-width: 768px) {
  .banner {
    left: 10px;
    right: 10px;
    width: auto;
    min-width: 200px;
    max-width: none;
  }
}

@media (max-width: 480px) {
  .banner {
    bottom: 10px;
    height: auto;
    min-height: 60px;
  }

  .banner-content {
    padding: 15px;
  }

  .banner-title {
    font-size: 14px;
    padding-right: 15px;
  }
}
</style>
