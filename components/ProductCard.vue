<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";
import FavoritesButton from "./FavoritesButton.vue";
import { useRouter } from "vue-router";
import { useSelectedProject } from "~/composables/useSelectedProject";
import { useMenu } from "~/composables/useMenu";

const props = defineProps({
  title: { type: String, required: true },
  price: { type: [Number, String], required: true },
  area: { type: [Number, String], required: true },
  // Изображения. Если передан только img — используется для всех зон
  img: { type: String, required: false },
  img1: { type: String, required: false },
  img2: { type: String, required: false },
  img3: { type: String, required: false },
  img4: { type: String, required: false },
  img5: { type: String, required: false },
  sh: { type: String, required: false },
  sh2: { type: String, required: false },
  sh3: { type: String, required: false },
  description: { type: String, required: false },
  pdf: { type: String, required: false },
  liked: { type: Boolean, default: false },
  hideActions: { type: Boolean, default: false },
  showPlan: { type: Boolean, default: false },
  cardId: { type: [String, Number], required: true },
});

// Функциональность избранного будет в отдельном компоненте

const formattedPrice = computed(() => {
  const numeric =
    typeof props.price === "number"
      ? props.price
      : Number(String(props.price).replace(/\D/g, ""));
  if (!isFinite(numeric)) return String(props.price);
  return new Intl.NumberFormat("ru-RU").format(numeric) + " ₽";
});

const images = computed(() => {
  const fallback = props.img || "";
  return [
    props.img1 || fallback,
    props.img2 || fallback,
    props.img3 || fallback,
    props.img4 || fallback,
    props.img5 || fallback,
  ];
});

const router = useRouter();
const { setSelectedProject } = useSelectedProject();
const { openMenu } = useMenu("right");

const hoveredIndex = ref(0);
const currentImage = computed(() => images.value[hoveredIndex.value] || "");

// Состояние модального окна
const isModalOpen = ref(false);
const modalImageIndex = ref(0);

// Состояние модального окна для планов
const isPlanModalOpen = ref(false);
const planModalIndex = ref(0);

// Планы для модального окна
const planImages = computed(() => {
  const plans = [];
  if (props.sh) plans.push(props.sh);
  if (props.sh2) plans.push(props.sh2);
  if (props.sh3) plans.push(props.sh3);
  return plans;
});

// Фильтруем изображения для модального окна (только существующие)
const modalImages = computed(() => {
  return images.value.filter((img) => img && img.trim() !== "");
});

function handleEnter(index) {
  hoveredIndex.value = index;
}
function handleLeave() {
  hoveredIndex.value = 0;
}

// Функции для модального окна
function openModal() {
  isModalOpen.value = true;
  modalImageIndex.value = 0;
  // Блокируем скролл страницы
  document.body.style.overflow = "hidden";
}

function closeModal() {
  isModalOpen.value = false;
  // Восстанавливаем скролл страницы
  document.body.style.overflow = "auto";
}

function nextModalImage() {
  if (modalImages.value.length > 1) {
    modalImageIndex.value =
      (modalImageIndex.value + 1) % modalImages.value.length;
  }
}

function prevModalImage() {
  if (modalImages.value.length > 1) {
    modalImageIndex.value =
      modalImageIndex.value === 0
        ? modalImages.value.length - 1
        : modalImageIndex.value - 1;
  }
}

function handleModalClick() {
  closeModal();
}

// Функции для модального окна планов
function openPlanModal() {
  if (planImages.value.length > 0) {
    isPlanModalOpen.value = true;
    planModalIndex.value = 0;
    // Блокируем скролл страницы
    document.body.style.overflow = "hidden";
  }
}

function closePlanModal() {
  isPlanModalOpen.value = false;
  // Восстанавливаем скролл страницы
  document.body.style.overflow = "auto";
}

function handlePlanModalClick() {
  closePlanModal();
}

// Функции навигации для планов
function nextPlanImage() {
  if (planImages.value.length > 1) {
    planModalIndex.value = (planModalIndex.value + 1) % planImages.value.length;
  }
}

function prevPlanImage() {
  if (planImages.value.length > 1) {
    planModalIndex.value =
      planModalIndex.value === 0
        ? planImages.value.length - 1
        : planModalIndex.value - 1;
  }
}

// Обработка клавиатуры для модальных окон
function handleKeydown(event) {
  // Обработка модального окна изображений
  if (isModalOpen.value) {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        prevModalImage();
        break;
      case "ArrowRight":
        event.preventDefault();
        nextModalImage();
        break;
      case "Escape":
        event.preventDefault();
        closeModal();
        break;
    }
  }

  // Обработка модального окна планов
  if (isPlanModalOpen.value) {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        prevPlanImage();
        break;
      case "ArrowRight":
        event.preventDefault();
        nextPlanImage();
        break;
      case "Escape":
        event.preventDefault();
        closePlanModal();
        break;
    }
  }
}

// Добавляем и удаляем слушатель клавиатуры
onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});

function goToHouseDetails() {
  // Передаем данные о доме через query параметры
  router.push({
    path: "/house",
    query: {
      houseTitle: props.title,
      price: props.price,
      area: props.area,
      houseImg: props.img || images.value[0],
      description: props.description || "",
      pdf: props.pdf || "",
    },
  });
}

function handleOrder() {
  // Устанавливаем выбранный проект
  setSelectedProject({
    title: props.title,
    price: props.price,
    area: props.area,
  });

  // Открываем правое меню
  openMenu();
}
</script>

<template>
  <div class="card">
    <div
      class="image"
      :style="{ backgroundImage: `url(${currentImage})` }"
      @mouseleave="handleLeave"
      @click="goToHouseDetails"
    >
      <div class="hover-zones">
        <div class="hover-zone left" @mouseenter="handleEnter(0)"></div>
        <div class="hover-zone center" @mouseenter="handleEnter(1)"></div>
        <div class="hover-zone right" @mouseenter="handleEnter(2)"></div>
      </div>
      <div class="badge">
        <img src="/svg/logo/logo.svg" alt="logo" />
      </div>
      <div class="dots">
        <span :class="{ active: hoveredIndex === 0 }"></span>
        <span :class="{ active: hoveredIndex === 1 }"></span>
        <span :class="{ active: hoveredIndex === 2 }"></span>
      </div>
    </div>
    <div class="content">
      <div class="meta">
        <h3 class="title">{{ title }}</h3>
        <div>
          <div class="price">
            {{ formattedPrice }}
          </div>
          <div class="area">{{ area }} м²</div>
        </div>
      </div>

      <div class="actions">
        <button class="btn" @click="goToHouseDetails">Подробнее</button>
        <div class="icons">
          <button
            class="btn order-btn"
            @click="handleOrder"
            v-if="!hideActions"
          >
            Заказать
          </button>
          <div>
            <div
              class="plan"
              @click="openPlanModal"
              v-if="showPlan || (!hideActions && planImages.length > 0)"
            >
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.10809 1.33344L1.6801 1.33344C1.62488 1.33344 1.5801 1.37821 1.5801 1.43343L1.58008 17.1926C1.58008 17.2478 1.62485 17.2926 1.68008 17.2926H12.5193M6.10809 1.33344L6.10809 9.77018C6.10809 9.82541 6.15286 9.87018 6.20809 9.87018L11.0491 9.87018M6.10809 1.33344L13.7239 1.33344M13.7239 1.33344L17.4393 1.33344C17.4945 1.33344 17.5393 1.37821 17.5393 1.43344V17.1926C17.5393 17.2478 17.4945 17.2926 17.4393 17.2926H12.5193M13.7239 1.33344V5.73785C13.7239 5.79308 13.6792 5.83785 13.6239 5.83785L10.675 5.83785M6.24328 13.5908L12.4193 13.5908C12.4746 13.5908 12.5193 13.6356 12.5193 13.6908V17.2926"
                  stroke="white"
                  stroke-width="1.3"
                />
              </svg>
            </div>
            <div class="view" @click="openModal">
              <svg
                width="29"
                height="16"
                viewBox="0 0 29 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0981 6.51556C20.0981 9.53023 17.6543 11.9741 14.6396 11.9741C11.6249 11.9741 9.18104 9.53023 9.18104 6.51556C9.18104 3.50089 11.6249 1.05701 14.6396 1.05701C17.6543 1.05701 20.0981 3.50089 20.0981 6.51556Z"
                  stroke="white"
                  stroke-width="1.3"
                />
                <path
                  d="M27.7844 8.03842C28.0391 8.24732 28.0271 8.64218 27.7584 8.83272C22.4524 12.5953 18.8943 14.6956 14.6398 14.6956C10.3589 14.6956 7.18713 13.2781 1.45403 8.81807C1.21033 8.62849 1.19762 8.26263 1.42628 8.05515C7.2541 2.76743 10.1187 0.83139 14.6398 0.83139C19.1459 0.83139 21.8692 3.18654 27.7844 8.03842Z"
                  stroke="white"
                  stroke-width="1.3"
                />
              </svg>
            </div>
            <ClientOnly v-if="!hideActions">
              <FavoritesButton :cardId="cardId" />
              <template #fallback>
                <div class="like">
                  <svg
                    width="22"
                    height="21"
                    viewBox="0 0 22 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.44922 7.37151C1.44922 13.2691 7.69933 17.2464 10.9942 19.7086C14.0354 17.3411 20.5392 12.038 20.5392 7.37151C20.5392 4.08309 18.0845 1.4173 15.0566 1.4173C13.4458 1.4173 11.9973 2.17168 10.9942 3.37286C9.99112 2.17168 8.5426 1.4173 6.93183 1.4173C3.90387 1.4173 1.44922 4.08309 1.44922 7.37151Z"
                      stroke="white"
                      stroke-width="1.3"
                    />
                  </svg>
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Модальное окно для просмотра изображений -->
  <Teleport to="body">
    <div v-if="isModalOpen" class="modal-overlay" @click="handleModalClick">
      <div class="modal-container" @click.stop>
        <!-- Левая кликабельная область -->
        <div
          class="modal-nav-left"
          @click.stop="prevModalImage"
          v-if="modalImages.length > 1"
        ></div>

        <!-- Правая кликабельная область -->
        <div
          class="modal-nav-right"
          @click.stop="nextModalImage"
          v-if="modalImages.length > 1"
        ></div>

        <!-- Изображение -->
        <img
          v-if="modalImages[modalImageIndex]"
          :src="modalImages[modalImageIndex]"
          :alt="title"
          class="modal-image"
        />

        <!-- Стрелки навигации -->
        <div class="modal-arrows" v-if="modalImages.length > 1">
          <div class="modal-arrow-left" @click.stop="prevModalImage">
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
          <div class="modal-arrow-right" @click.stop="nextModalImage">
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

  <!-- Модальное окно для просмотра планов -->
  <Teleport to="body">
    <div
      v-if="isPlanModalOpen"
      class="modal-overlay"
      @click="handlePlanModalClick"
    >
      <div class="modal-container" @click.stop>
        <!-- Левая кликабельная область -->
        <div
          class="modal-nav-left"
          @click.stop="prevPlanImage"
          v-if="planImages.length > 1"
        ></div>

        <!-- Правая кликабельная область -->
        <div
          class="modal-nav-right"
          @click.stop="nextPlanImage"
          v-if="planImages.length > 1"
        ></div>

        <!-- Изображение плана -->
        <img
          v-if="planImages[planModalIndex]"
          :src="planImages[planModalIndex]"
          :alt="title + ' - План'"
          class="modal-image"
        />

        <!-- Стрелки навигации -->
        <div class="modal-arrows" v-if="planImages.length > 1">
          <div class="modal-arrow-left" @click.stop="prevPlanImage">
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
          <div class="modal-arrow-right" @click.stop="nextPlanImage">
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

        <!-- Индикаторы планов -->
        <div class="modal-indicators" v-if="planImages.length > 1">
          <div
            v-for="(plan, index) in planImages"
            :key="index"
            class="modal-indicator"
            :class="{ active: index === planModalIndex }"
            @click.stop="planModalIndex = index"
          ></div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.card {
  overflow: hidden;
  width: 100%;
}
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.image {
  width: 100%;
  aspect-ratio: 16 / 9;
  background-size: cover;
  background-position: center;
  position: relative;
  cursor: pointer;
  background: #ffffff0d;
  background-position: center;
  background-position: center;
  background-size: cover;
}
.hover-zones {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  z-index: 2;
}
.view:active,
.plan:active,
.like:active {
  scale: 0.95;
}
.hover-zone {
  height: 100%;
}
.hover-zone.left {
  cursor: pointer;
}
.hover-zone.center {
  cursor: pointer;
}
.hover-zone.right {
  cursor: pointer;
}
.badge {
  position: absolute;
  left: 20px;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.7);
}
.badge img {
  height: 24px;
  opacity: 0.6;
}
.dots {
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  gap: 8px;
}
.area {
  color: #b7b7b7;
  font-weight: 400;
  font-size: clamp(16px, 1.5vw, 20px);
}
.dots span {
  width: 8px;
  height: 8px;
  background: #d9d9d9;
  opacity: 0.5;
  border-radius: 50%;
}
.dots span.active {
  background: #ffffff;
  opacity: 1;
}
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.meta {
  display: flex;
  flex-direction: column;
  width: 55%;
}
.meta div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price {
  color: #65c36c;

  font-size: clamp(16px, 2vw, 28px);
}
.actions .btn {
  font-size: clamp(10px, 1vw, 15px);
  padding: 0;
  width: 100%;
}
.actions {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
}
.icons {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
}
.icons button {
  background: transparent;
  color: #cacaca;
}
.icons button:hover {
  color: #ffffff;
}
.icons div {
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
}
.icons div svg {
  cursor: pointer;
  transition: var(--tran);
}
.icons div svg:hover path {
  stroke: var(--green);
  transition: var(--tran);
}
.btn.primary {
  background: var(--green);
}
.icons {
  display: flex;
  gap: 16px;
}
.icons img {
  height: 22px;
  opacity: 0.9;
}

/* Стили модального окна */
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
  border-radius: 0;
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
/* Мобильная адаптация */
@media (max-width: 768px) {
  .card {
    margin-bottom: 20px;
  }

  .image {
    aspect-ratio: 4 / 3;
  }

  .hover-zones {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .badge {
    left: 15px;
    bottom: 15px;
    font-size: 14px;
  }

  .badge img {
    height: 20px;
  }

  .dots {
    right: 15px;
    bottom: 15px;
    gap: 6px;
  }

  .dots span {
    width: 6px;
    height: 6px;
  }

  .content {
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }

  .meta {
    width: 100%;
  }

  .meta div {
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
  }

  .title {
    font-size: 18px;
    white-space: normal;
    line-height: 1.3;
    margin-bottom: 10px;
  }

  .area {
    font-size: 16px;
    color: #9f9f9f;
  }

  .price {
    font-size: 20px;
    font-weight: 600;
  }

  .actions {
    width: 100%;
    align-items: stretch;
  }

  .actions .btn {
    font-size: 16px;
    padding: 12px 20px;
    width: 100%;
    min-height: 48px;
    touch-action: manipulation;
  }

  .icons {
    width: 100%;
    justify-content: space-between;
    padding: 15px 0;
  }

  .icons div {
    gap: 15px;
  }

  .icons img {
    height: 24px;
  }

  /* Модальные окна для мобильных */
  .modal-container {
    width: 95vw;
    height: 70vh;
    max-width: none;
  }

  .modal-image {
    width: 100%;
    height: auto;
    max-height: 100%;
  }

  .modal-arrows {
    padding: 0 10px;
  }

  .modal-arrow-left,
  .modal-arrow-right {
    width: 50px;
    height: 50px;
  }

  .modal-arrow-left svg,
  .modal-arrow-right svg {
    width: 40px;
    height: 40px;
  }

  .modal-indicators {
    bottom: 20px;
  }

  .modal-indicator {
    width: 8px;
    height: 8px;
  }
}
</style>
