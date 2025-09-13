<template>
  <!-- Модальное окно для просмотра изображений -->
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click="handleModalClick">
      <div class="modal-container" @click.stop>
        <!-- Левая кликабельная область -->
        <div
          class="modal-nav-left"
          @click.stop="prevImage"
          v-if="images.length > 1"
        ></div>

        <!-- Правая кликабельная область -->
        <div
          class="modal-nav-right"
          @click.stop="nextImage"
          v-if="images.length > 1"
        ></div>

        <!-- Изображение -->
        <img
          v-if="images[currentIndex]"
          :src="images[currentIndex]"
          :alt="alt"
          class="modal-image"
        />

        <!-- Стрелки навигации -->
        <div class="modal-arrows" v-if="images.length > 1">
          <div class="modal-arrow-left" @click.stop="prevImage">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                stroke-width="1"
                stroke-linecap="square"
                stroke-linejoin="miter"
              />
            </svg>
          </div>
          <div class="modal-arrow-right" @click.stop="nextImage">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                stroke-width="1"
                stroke-linecap="square"
                stroke-linejoin="miter"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  images: {
    type: Array,
    default: () => [],
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
  alt: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close", "update:isOpen"]);

const currentIndex = ref(props.initialIndex);

// Следим за изменением initialIndex
watch(
  () => props.initialIndex,
  (newIndex) => {
    currentIndex.value = newIndex;
  }
);

// Следим за изменением isOpen
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);

function closeModal() {
  emit("close");
  emit("update:isOpen", false);
  document.body.style.overflow = "";
}

function handleModalClick() {
  closeModal();
}

function nextImage() {
  if (props.images.length > 1) {
    currentIndex.value = (currentIndex.value + 1) % props.images.length;
  }
}

function prevImage() {
  if (props.images.length > 1) {
    currentIndex.value =
      currentIndex.value === 0
        ? props.images.length - 1
        : currentIndex.value - 1;
  }
}

// Обработка клавиатуры
function handleKeydown(event) {
  if (!props.isOpen) return;

  switch (event.key) {
    case "ArrowLeft":
      event.preventDefault();
      prevImage();
      break;
    case "ArrowRight":
      event.preventDefault();
      nextImage();
      break;
    case "Escape":
      event.preventDefault();
      closeModal();
      break;
  }
}

// Добавляем и удаляем слушатель клавиатуры
onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(15px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-container {
  position: relative;
  width: auto;
  height: 80vh;
  max-width: 1500px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  transform: scale(0.9);
  animation: scaleIn 0.3s ease-out forwards;
}

@keyframes scaleIn {
  from {
    transform: scale(0.98);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-image {
  width: auto;
  height: 100%;
  object-fit: contain;
  border-radius: 0px;
  cursor: default;
}

/* Кликабельные области для навигации */
.modal-nav-left,
.modal-nav-right {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  z-index: 5;
  cursor: pointer;
}

.modal-nav-left {
  left: 0;
}

.modal-nav-right {
  right: 0;
}

/* Стрелки навигации */
.modal-arrows {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  pointer-events: none;
  z-index: 10;
}

.modal-arrow-left,
.modal-arrow-right {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.1s ease-in-out, background-color 0.5s ease;
  pointer-events: all;
}

/* Эффекты при наведении на левую/правую части */
.modal-nav-left:hover ~ .modal-arrows .modal-arrow-left {
  opacity: 1;
}

.modal-nav-right:hover ~ .modal-arrows .modal-arrow-right {
  opacity: 1;
}
</style>
