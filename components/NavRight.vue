<template>
  <div
    ref="navRightRef"
    class="nav-right"
    :class="{ open: isOpen }"
    @click.stop
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div class="nav-right-container">
      <div class="nav-right-content">
        <div class="nav-top-menu">
          <h3>+7 910 989-26-79</h3>
          <Network />
        </div>
        <div class="nav-right-menu">
          <!-- <h1>Обратная<br />связь</h1> -->
          <FormNav />
        </div>
        <div class="nav-right-footer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, onMounted, onUnmounted, ref } from "vue";
import { useMenu } from "~/composables/useMenu";
import { useMenuManager } from "~/composables/useMenuManager";
import { useSelectedProject } from "~/composables/useSelectedProject";
import Network from "./Network.vue";

const { isOpen, menuRef: navRightRef, updatePosition } = useMenu("right");
const { rightMenuOpen } = useMenuManager();
const { clearSelectedProject } = useSelectedProject();

// Переменные для обработки свайпа
const touchStartX = ref(0);
const touchStartY = ref(0);
const isSwipeStarted = ref(false);

// Функции для обработки свайпа
const handleTouchStart = (event) => {
  if (!isOpen.value) return;

  const touch = event.touches[0];
  touchStartX.value = touch.clientX;
  touchStartY.value = touch.clientY;
  isSwipeStarted.value = false;
};

const handleTouchMove = (event) => {
  if (!isOpen.value) return;

  const touch = event.touches[0];
  const deltaX = touch.clientX - touchStartX.value;
  const deltaY = touch.clientY - touchStartY.value;

  // Проверяем, что это горизонтальный свайп (больше движения по X, чем по Y)
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
    isSwipeStarted.value = true;
    // Предотвращаем скролл страницы при свайпе
    event.preventDefault();
  }
};

const handleTouchEnd = (event) => {
  if (!isOpen.value || !isSwipeStarted.value) return;

  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - touchStartX.value;

  // Если свайп вправо (в сторону закрытия) больше 50px, закрываем меню
  if (deltaX > 50) {
    isOpen.value = false;
  }

  isSwipeStarted.value = false;
};

// Очищаем выбранный проект при закрытии меню
watch(isOpen, (newValue) => {
  if (!newValue) {
    clearSelectedProject();
  }
});

// Синхронизируем состояние с глобальным менеджером
watch(rightMenuOpen, (newValue) => {
  if (!newValue && isOpen.value) {
    // Если глобальное состояние закрыто, но локальное открыто - закрываем локальное
    isOpen.value = false;
  }
});

// Слушаем события для открытия/закрытия меню
const handleToggleRightMenu = (event) => {
  console.log("NavRight получил событие:", event.detail);
  isOpen.value = event.detail.isOpen;
};

onMounted(() => {
  window.addEventListener("toggleRightMenu", handleToggleRightMenu);
});

onUnmounted(() => {
  window.removeEventListener("toggleRightMenu", handleToggleRightMenu);
});
</script>

<style scoped>
.nav-top-menu {
  height: 20%;
}

.nav-right {
  position: fixed;
  top: 0;
  right: 0;
  width: clamp(300px, 20%, 350px);
  height: 100vh;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(150px);
  z-index: 9999;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  box-shadow: 0 0 20px #0000004a;
}

.nav-right.open {
  transform: translateX(0%);
  opacity: 1;
}

.nav-right-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
}
.nav-top-menu h3 {
  font-weight: 400;
  width: 100%;
  text-align: end;
  margin: 10% 0;
}
.nav-right-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav-right-menu {
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.nav-right-menu h1 {
  text-align: end;
  font-weight: 300;
  font-size: var(--fs-p);
  width: 80%;
}

.nav-right-menu ul {
  margin: 10% 0;
}

.nav-right-footer {
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
@media (max-width: 768px) {
  .nav-right-container[data-v-9872edf8] {
    padding: 50px 20px;
  }
  .form-input {
    padding: 5px 20px;

    font-size: 16px;
  }
}
</style>
